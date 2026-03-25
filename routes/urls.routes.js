import express from "express";
import { authValidateMiddleware } from "../middleware/auth.middleware.js";
import { shortenPostRequestBodySchema } from "../Validation/request.validation.js";
// import { shortenPostRequestBodySchema } from "../Validation/request.validation";
import db from "../db/index.js";
import { nanoid } from "nanoid";
import { urlTable } from "../models/url.model.js";

const router = express.Router();

router.post("/shorten", authValidateMiddleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    
    return res.status(401).json({ error: "You need authorization token" });
  }
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }
  try {
    const { url, code } =  validationResult.data;
    let shortCode = code ?? nanoid(6);
    const [result] = await db
      .insert(urlTable)
      .values({
        shortCode,
        targetUrl: url,
        userId: req.user.id,
      })
      .returning({
        id: urlTable.id,
        shortCode: urlTable.shortCode,
        targetUrl: urlTable.targetUrl,
      });

    res
      .status(201)
      .json({
        message: "Data creataed successfully",
        id: result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetUrl,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;

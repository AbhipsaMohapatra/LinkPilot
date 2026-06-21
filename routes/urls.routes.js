import express from "express";
import { authValidateMiddleware } from "../middleware/auth.middleware.js";
import { shortenPostRequestBodySchema } from "../Validation/request.validation.js";
// import { shortenPostRequestBodySchema } from "../Validation/request.validation";
import db from "../db/index.js";
import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";
import { urlTable } from "../models/url.model.js";
import { isExistingUserAuthenticated } from "../middleware/auth.middleware.js";
import { insertIntoUrlTable } from "../services/users.services.js";
import { userTable } from "../models/userModel.js";
import { getUrlById } from "../services/urls.services.js";

const router = express.Router();

router.post(
  "/shorten",
  [authValidateMiddleware, isExistingUserAuthenticated],
  async (req, res) => {
    const userId = req.user?.id;

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body,
    );
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error });
    }
    try {
      const { url, code } = validationResult.data;
      let shortCode = code ?? nanoid(6);
      const result = await insertIntoUrlTable(url, shortCode, userId);
      // const [result] = await db
      //   .insert(urlTable)
      //   .values({
      //     shortCode,
      //     targetUrl: url,
      //     userId: req.user.id,
      //   })
      //   .returning({
      //     id: urlTable.id,
      //     shortCode: urlTable.shortCode,
      //     targetUrl: urlTable.targetUrl,
      //   });

      res.status(201).json({
        message: "Data creataed successfully",
        id: result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetUrl,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
);

router.get(
  "/getAllUrls",
  [authValidateMiddleware, isExistingUserAuthenticated],
  async (req, res) => {
    const id = req.user.id;
    
    try {
      const result = await db
        .select()
        .from(urlTable)
        .where(eq(urlTable.userId, id));
      

      if (!result) {
        res.status(204).json({ message: "No content found" });
      }
      return res.json({ result });
    } catch (error) {
      console.log(error);
    }
  },
);

router.delete("/:id",[authValidateMiddleware, isExistingUserAuthenticated], async (req, res) => {
  const id = req.params.id;

  try {
    const [exists] = await getUrlById(id);
    if(!exists){
      return res.status(400).json({error:"No such URLS exists"});
    }
   const result =  await db
      .delete(urlTable)
      .where(and(eq(urlTable.id, id), eq(urlTable.userId, req.user.id)));
     
    if(result.rowCount==0){
      return res.json({message:"No data deleted"})
    }
    return res.json({message:`data deleted`});
  } catch (error) {
    console.log(error);
    res.json({error:"Some errir occures"})
  }
});

router.patch("/update/:id",[authValidateMiddleware,isExistingUserAuthenticated],async(req,res)=>{
  const id = req.params.id;
  const { newval } = req.body;
  if(!newval) return res.json({error:"Please input a valid string"});

  try{
    const exists = await getUrlById(id);
    if(!exists){
      return res.status(400).json({error:"No such URLS exists"});
    }

    const result = await db.update(urlTable).set({shortCode:newval}).where(and(eq(id,urlTable.id),eq(urlTable.userId,req.user.id)))
    if(result.rowCount==0){
      return res.json({message:"No Row updated"});

    }
    return res.status(200).json({message:"Data successfully updated"});

  }
  catch(e){
    console.log(e);
    return res.json({error:e});

  }

})

router.get("/:shortCode", async (req, res) => {
  const shortUrl = req.params.shortCode;
  try {
    const [result] = await db
      .select({ targetUrl: urlTable.targetUrl })
      .from(urlTable)
      .where(eq(urlTable.shortCode, shortUrl));
    if (!result) {
      return res.status(400).json({ error: "No such url present" });
    }
    res.redirect(result.targetUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
export default router;

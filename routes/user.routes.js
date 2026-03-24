import express from "express";
// import db from "../db/index.js";
// import { userTable } from "../models/userModel.js";

import {
  SignupPostRequestBodySchema,
  LoginPostRequestBodySchema,
} from "../Validation/request.validation.js";
import {
  findExistingUserByEmail,
  insertUserData,
} from "../services/users.services.js";

import { getHashedData } from "../utils/hash.js";
import {getJWTToken} from "../utils/jwt.token.js"
// import jwt from "jsonwebtoken";

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const validationResult = await SignupPostRequestBodySchema.safeParseAsync(
    req.body,
  );
  if (validationResult.error) {
    return res
      .status(400)
      .json({
        error: validationResult.error.message,
        data: "Error in validation",
      });
  }
  const { firstName, lastName, email, password } = validationResult.data;

  try {
    const existingUser = await findExistingUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const { salt, password: hashedPassword } = getHashedData(password);

    const user = await insertUserData(
      firstName,
      lastName,
      email,
      hashedPassword,
      salt,
    );

    res.status(200).json({ data: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, data: err });
  }
});

UserRouter.post("/login", async (req, res) => {
  const validationResult = await LoginPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    console.log(validationResult.error.message)
    return res
      .status(400)
      .json({ error: validationResult.error });
  }

  const { email, password } = validationResult.data;
  try {
    const existingUser = await findExistingUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ error: "User does'nt exists" });
    }
    const { password: hashedPassword } = getHashedData(
      password,
      existingUser.salt,
    );
    if (existingUser.password != hashedPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    const token = await getJWTToken({id:existingUser.id});
    // const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);

    return res.status(201).json({ success: "User added successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export default UserRouter;

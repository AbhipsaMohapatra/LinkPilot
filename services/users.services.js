import db from "../db/index.js"
import { userTable } from "../models/userModel.js";
import { eq } from "drizzle-orm";
import { urlTable } from "../models/url.model.js";

export const findExistingUserByEmail = async(email)=>{
    const [existingUser] = await db
      .select({ id: userTable.id ,firstName:userTable.firstName,lastName:userTable.lastName,email:userTable.email,salt:userTable.salt,password:userTable.password})
      .from(userTable)
      .where(eq(userTable.email, email));

      return existingUser;


}

export const insertUserData = async (firstName,lastName,email,hashedPassword,salt)=>{
    const [user] = await db
      .insert(userTable)
      .values({ firstName, lastName, email, password: hashedPassword, salt })
      .returning({ id: userTable.id });
    return user;  
}

export const insertIntoUrlTable = async( url, code,userId)=>{
  let shortCode = code ?? nanoid(6);
    const [result] = await db
      .insert(urlTable)
      .values({
        shortCode,
        targetUrl: url,
        userId: userId,
      })
      .returning({
        id: urlTable.id,
        shortCode: urlTable.shortCode,
        targetUrl: urlTable.targetUrl,
      });
      return result;

}
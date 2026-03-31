import db from "../db/index.js"
import { userTable } from "../models/userModel.js";
import { eq } from "drizzle-orm";
import { urlTable } from "../models/url.model.js";

export const getUrlById = async(id)=>{
     const [exists] = await db.select().from(urlTable).where(eq(urlTable.id,id));

     return exists;
}
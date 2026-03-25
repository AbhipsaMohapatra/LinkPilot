import { pgTable,uuid,text,varchar,timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./userModel.js";

export const urlTable = pgTable('urls',{
    id:uuid().primaryKey().defaultRandom(),

    shortCode:varchar('code',{length:155}).unique().notNull(),
    targetUrl:text('target_url').notNull(),

    userId:uuid('user_id').references(()=>userTable.id).notNull(),


    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').$onUpdate(()=> new Date())
})
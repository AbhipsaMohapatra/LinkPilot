import { randomBytes, createHmac } from "node:crypto";

export const getHashedData = (password,saltv=undefined)=>{
     const salt = saltv ?? randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt).update(password).digest('hex');
    return {salt,password:hashedPassword};
}
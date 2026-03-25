import jwt from "jsonwebtoken";
import { validateJWT } from "../Validation/jwt.validation.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const  getJWTToken = async(payload)=>{
    const validate = await validateJWT.safeParseAsync(payload);
    if(validate.error){
        throw new Error("Invalid JWT token")
    }
    const playloadValidated = validate.data

    const token = jwt.sign(playloadValidated,JWT_SECRET);
    return token;

}

export const validateUserToken = (token)=>{
    try{
        const payload=jwt.verify(token,JWT_SECRET);
        return payload
    }
    catch(err){
        console.log(err);
        return null;

    }
    

}
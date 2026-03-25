
import { validateUserToken } from "../utils/jwt.token.js";
export const authValidateMiddleware = async(req,res,next)=>{
  const header = req.headers['authorization'];
  if(!header){
    return next();
  }
  if(!header.startsWith('Bearer')){
    return res.status(400).json({error:"Headers should start with Bearer"})
  }
  const [_,token] = header.split(" ")
  const payload = validateUserToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  req.user = payload
  return next();

}
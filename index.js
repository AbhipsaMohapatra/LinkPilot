import express from "express";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./routes/user.routes.js"
import UrlRouter from "./routes/urls.routes.js"

const app= express();

const PORT = process.env.PORT;

app.use(express.json())

app.get("/",(req,res)=>{
    return res.send("Hello World");
})
app.use("/user",UserRouter);

app.use(UrlRouter);

app.listen(PORT,()=>{
    console.log("Server listening on PORT ",PORT);
})
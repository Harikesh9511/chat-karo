import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();



app.use(express.json());
app.use(cookieParser()); //so that we can use cookie for route protection


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname,"frontend", "dist","index.html"))
})




server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`)
});
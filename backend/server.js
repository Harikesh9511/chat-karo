import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5001;



app.use(express.json());
app.use(cookieParser()); //so that we can use cookie for route protection


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);




server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on Port ${PORT}`)
});
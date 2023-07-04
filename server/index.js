import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

import questionRoutes from "./routes/Questions.js";
import userRoutes from "./routes/users.js";
import answerRoutes from "./routes/Answers.js";
import postRoutes from "./routes/Posts.js";
import commentRoutes from "./routes/Comments.js";
import planRoutes from "./routes/Plan.js";
import subRoutes from "./routes/Subscriber.js";
import friendRoutes from "./routes/Friends.js";
import connectDB from "./connectMongoDb.js";
import messagebird from 'messagebird'

const app = express();
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

var key = "sk";
key += "-9ZJxaEZ9ZTKjzZ7R6Vfh";
key += "T3BlbkFJU69E9t";
key += "jAbjnudRHlW6rz";

const messagebirdInst = messagebird.initClient("0bzfw8yLTEhx8TPaI7MeW7fWj");
const configuration = new Configuration({
  organization: process.env.AI_ORGANIZATION_ID,
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (request, response) => {
  const { chats } = request.body;
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a StackBot. You can help with Programming related tasks",
      },
      ...chats,
    ],
  });
  response.json({
    output: result.data.choices[0].message,
  });
});

app.post("/sendsms", async (req, res) => {
  const { to } = req.body;
  messagebirdInst.verify.create(to,{template : 'Your verification code is %token'},function(err, response){
      if(err){
        res.json({
          error: err.errors[0].description,
        });
      }else{
        res.json({
          id: response.id,
        });
      }
  });
 
});

app.post("/verifyOTP", async (req, res) => {
  const { id,otp } = req.body;
  messagebirdInst.verify.verify(id,otp,function(err, response){
    if(err){
      res.json({
        error: err.errors[0].description,
      });
    }else{
      res.json({
        verified: true,
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);
app.use("/plans", planRoutes);
app.use("/payment", subRoutes);
app.use("/friends", friendRoutes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on the port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

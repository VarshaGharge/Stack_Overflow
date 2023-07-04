import Questions from "../models/Questions.js";
import mongoose from "mongoose";
import User from '../models/auth.js';

export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Questions(postQuestionData);
  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find({});
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully deleted...." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const questionLimit = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const entries = await Questions.find({ userId, askedOn: { $gte: today } });
    console.log("User",user);
    console.log("entries",entries.length);
    if((user.plan == "Free" && entries.length >= 1) || (user.plan == "Silver" && entries.length >= 5)){
      res.status(200).json({limitExceeded : true});
    }else{
      res.status(200).json({limitExceeded : false});
    }
  } catch (error) {
    res.status(404).json({ message: error.message,limitExceeded : false });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable... ");
  }

  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};

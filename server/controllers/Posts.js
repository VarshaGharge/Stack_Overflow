import Posts from "../models/Posts.js";
import mongoose from "mongoose";

export const PostContent = async (req, res) => {
  const addPostData = req.body;
  const addPost = new Posts(addPostData);
  try {
    await addPost.save();
    res.status(200).json("Posted a Post successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const postList = await Posts.find({});
    res.status(200).json(postList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable...");
  }
  try {
    await Posts.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully deleted...." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable... ");
  }

  try {
    const post = await Posts.findById(_id);
    const user = post.Like.filter((l) => l.userId === String(userId.userId));
    if (user.length == 0) {
      post.Like.push(userId);
    } else {
      post.Like = post.Like.filter((l) => l.userId !== String(userId.userId));
    }
    await Posts.findByIdAndUpdate(_id, post);
    res.status(200).json({ message: "liked successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};

export const sharePost = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("post unavailable... ");
  }

  try {
    const post = await Posts.findById(_id);
    post.share += 1;
    await Posts.findByIdAndUpdate(_id, post);
    res.status(200).json({ message: "shared successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};

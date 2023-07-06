import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/auth.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword});
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    var message = "User logged in successfully";
    if(existinguser.plan != "free" && existinguser.planDate < new Date()){
      existinguser.plan = "free";
      existinguser.planDate = Date.now();
      await User.findByIdAndUpdate(existinguser.id, existinguser);
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser,message, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const setPlan = async (req, res) => {
  const { plan, planDate } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("user unavailable...");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, plan, planDate);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};
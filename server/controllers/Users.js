import mongoose from "mongoose";
import User from '../models/auth.js';

export const getAllUsers = async (req, res) => {
    try {
      const allUsers = await User.find();
      const allUserDetails = [];
      allUsers.forEach(user => { 
        allUserDetails.push(user);
      });
      res.status(200).json(allUserDetails);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("user unavailable...");
    }
    try {
      const updatedProfile = await User.findByIdAndUpdate( _id, { $set: { name: name, about: about, tags: tags } }, { new: true });
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };


  export const updatePlan = async (req, res) => {
    const { id: _id } = req.params;
    const { plan, planDate } = req.body;
    console.log("plan",planDate);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("User unavailable...");
    }
    try {
      const updatedPlan = await User.findByIdAndUpdate( _id, { $set: { plan, planDate } }, { new: true });
      res.status(200).json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
import mongoose from "mongoose";
import User from '../models/auth.js'

export const addFriend = async (req, res) => {
    const { id: _id } = req.params;
    const {friendId} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("user unavailable..."); 
    }
    try {
      const user = await User.findById(_id)
      if(!user.friend){
        user.friend = [];
      }
      const friend = user.friend.filter(l => l === String(friendId));
      if (friend.length == 0) {
        user.friend.push(friendId);
      } else {
        user.friend = user.friend.filter((l) => l !== String(friendId));
      }
      const updatedUser = await User.findByIdAndUpdate(_id, user);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  
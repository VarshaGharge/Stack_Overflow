import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  picture: String,
  content: { type: String },
  Like:[ 
    { 
      userId: String,
    }],
  userPosted: { type: String },
  share: { type:Number, default: 0},
  noOfComments: { type: Number, default: 0 },
  userId: { type: String },
  postedOn: { type: Date, default: Date.now },
  comment: [
    {
      commentBody: String,
      userCommented: String,
      userId: String,
      commentedOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Post", PostSchema);
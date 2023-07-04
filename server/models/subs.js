import mongoose from "mongoose";

const subSchema = mongoose.Schema({
        userId: {type: String},
        planId: { type: String },
        status: { type: String, enum: ['pending...','success', 'failed'], default: "pending..." },
        joinedDate: {type: Date, default: Date.now},
})

export default mongoose.model("Subs", subSchema)
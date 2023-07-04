import mongoose from "mongoose";

const planSchema = mongoose.Schema({
        plan: {type: String},
        desc: {type: String},
        price: {type: Number},
})

export default mongoose.model("Plan", planSchema)
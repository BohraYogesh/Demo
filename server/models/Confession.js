import mongoose from "mongoose";

const schema = new mongoose.Schema({
  confession: String,
  senderIP: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Confession", schema);

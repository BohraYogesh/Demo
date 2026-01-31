import mongoose from "mongoose";

const schema = new mongoose.Schema({
  confession: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["All", "Happy", "Sad", "Regret", "Funny", "Secret"],
    default: "All",
    required: true,
  },
  
  avatar: {
    type: String,
    required: true,
  },

  senderIP: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Confession", schema);

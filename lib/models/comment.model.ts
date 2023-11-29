import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToDo",
  },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
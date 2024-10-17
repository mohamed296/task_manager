import mongoose from "mongoose";

export interface IComment extends mongoose.Document {
  comment: string;
  commentedBy:any;
  taskId:any;
  createAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>({
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commentedBy",
    required: [true, "Commented by is required"],
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskId",
    required: [true, "Task id is required"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const comment = mongoose.model<IComment>("comment", commentSchema);
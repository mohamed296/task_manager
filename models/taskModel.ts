import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  title: string;
  description: string;
  status: string;
  addedBy:any;
  project: any;
  assigneeTo: any[];
  dueDate: Date;
  comments: any[];
}

const taskSchema= new mongoose.Schema<ITask>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
    },

    status: {
        type: String,
        enum: ["to do", "in progress", "done"],
        default: "to do",
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    },
    assigneeTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
     
    },
    dueDate: {
        type: Date,
        
        required: [true, "Due date is required"],
    },
    comments:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
    }],
    });


    export const task = mongoose.model<ITask>("task", taskSchema);
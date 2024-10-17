import mongoose from "mongoose";

export interface IProject extends mongoose.Document {
    title: string;
    description: string;
    createBy:any;
    tasks: any[];
    users: any[];
    createAt: Date;   
}

const projectSchema = new mongoose.Schema<IProject>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreateBy",
       
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      
    }],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

export const project = mongoose.model<IProject>("project", projectSchema);
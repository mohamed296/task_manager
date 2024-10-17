import { Request,Response } from "express";
import { comment } from "../models/commentModel";
import {task} from "../models/taskModel";
import ErrorHandler  from '../middleware/errorMiddleware';




const createComment= ErrorHandler.catchAsync  (async (req: Request, res: Response)=>{
   
      
        const newComment = new comment({
            comment: req.body.comment,
            taskId: req.body.taskId,
            commentedBy: req.body.user.userId
        });
        await newComment.save();

        const currentTask = await task.findById(req.body.taskId);

        if (!currentTask) {
            return res.status(404).json({ message: "Project not found" });
        }

       
        currentTask.comments.push(newComment._id);
        currentTask.save();

        res.status(200).json({message: "Comment created successfully"});
    
});

const deleteComment= ErrorHandler.catchAsync (async  (req: Request, res: Response)=>{
    
        const commentExist = await comment.findById(req.params.id);
        if(!commentExist){
            return res.status(404).json({message: "Comment not found"});
        }
        await comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Comment deleted successfully"});
  
})

export default { createComment, deleteComment };
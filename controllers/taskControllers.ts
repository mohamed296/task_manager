import { Request, Response } from "express";

import { task } from "../models/taskModel";
import { project } from "../models/projectModel";
import ErrorHandling from "../middleware/errorMiddleware";

const createTask= ErrorHandling.catchAsync(async (req: Request, res: Response) =>{
  
    const newTask = new task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      addedBy: req.body.user.userId,
      assigneeTo: req.body.assigneeTo,
      project: req.body.projectId,
    });

    await newTask.save();
    const currentProject = await project.findById(req.body.projectId);

    if (!currentProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    currentProject.tasks.push(newTask._id);
    currentProject.save();

    res.status(200).json({ message: "Task created successfully" });
 
})

const getTasks= ErrorHandling.catchAsync(async  (req: Request, res: Response)=> {
   
  
    const tasks = await task
      .find({
        project: req.query.projectId,
      })
      .populate("addedBy");
    res.status(200).json({ data: tasks });
 
})

const getTaskById= ErrorHandling.catchAsync (async (req: Request, res: Response)=>{
 
    const taskExist = await task
      .findById(req.params.id)
      .populate("addedBy")
      .populate("assigneeTo")
      .populate("comments");
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ data: taskExist });
 
})

const updateTask= ErrorHandling.catchAsync(async (req: Request, res: Response)=>{
  
    const taskExist = await task.findById(req.params.id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Task updated successfully" });
 
})

const deleteTask= ErrorHandling.catchAsync(async (req: Request, res: Response) =>{
  
    const taskExist = await task.findById(req.params.id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  
})

export default { createTask, getTasks, getTaskById, updateTask, deleteTask };

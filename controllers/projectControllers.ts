import { Request,Response } from "express";
import { project } from "../models/projectModel";
import ErrorHandling from '../middleware/errorMiddleware'

const createProject = ErrorHandling.catchAsync(async (req: Request, res: Response)=>{
    const currentUser = req.body.user ;
   
        const newProject = new project({
            title: req.body.title,
            description: req.body.description,
            createBy: currentUser._id,
            users: req.body.users
        }) ;

        await newProject.save();
        res.status(200).json({message: "Project created successfully"});
   
})

const getProject =  ErrorHandling.catchAsync(async  (req: Request, res: Response)=>{
    const currentUser = req.body.user ;

   
        const projects = await project.find({
            $or: [
                {addedBy: currentUser._id},
                {assigneeTo: currentUser._id}
            ]
        }).populate("addedBy").populate("assigneeTo");
        res.status(200).json({data: projects});
   
})

const getProjectById= ErrorHandling.catchAsync(async (req: Request, res: Response)=>{
 
        const projectExist = await project.findById(req.params.id).populate("addedBy").populate("assigneeTo");
        if(!projectExist){
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json({data: projectExist});
    
})

const updateProject= ErrorHandling.catchAsync(async(req: Request, res: Response)=>{
   
        const projectExist = await project.findById(req.params.id);
        if(!projectExist){
            return res.status(404).json({message: "Project not found"});
        }
        await project.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({message: "Project updated successfully"});
  
})


const deleteProject= ErrorHandling.catchAsync(async(req: Request, res: Response)=>{
   
        const projectExist = await project.findById(req.params.id);
        if(!projectExist){
            return res.status(404).json({message: "Project not found"});
        }
        await project.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Project deleted successfully"});
   
})


export default { createProject, getProject, getProjectById, updateProject, deleteProject };
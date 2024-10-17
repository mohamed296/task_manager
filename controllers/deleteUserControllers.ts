import { Request,Response } from "express";
import { user } from "../models/userModel";
import ErrorHandler  from '../middleware/errorMiddleware';



const deleteUser= ErrorHandler.catchAsync (async  (req: Request, res: Response)=>{
   
        const userExist = await user.findById(req.params.id);
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
   
})

export default deleteUser;
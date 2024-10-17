import { Request,Response } from "express";
import { notification } from "../models/notificationModel";
import {io} from "../index";
import ErrorHandler  from '../middleware/errorMiddleware';


async function addNotification(massage: string, userId: string[]){
    try{
        const newNotification = new notification({
            massage: massage,
            user: userId
        });
        await newNotification.save();

        io.to(userId.toString()).emit('notification', {message: massage});
    }catch(error){
        console.log(error);
    }
    
} 

const getNotification= ErrorHandler.catchAsync (async (req: Request, res: Response)=>{

    const notifications = await notification.find({user: req.body.user.userId}).sort({createdAt: -1});
    res.status(200).json({data: notifications});  

})

const getUnreadNotificationCount = ErrorHandler.catchAsync(async (req: Request, res: Response)=>{

    const count = await notification.aggregate([
        {$match:{user:req.body.user.userId, isRead: false}},
        {$count: "unreadNotifications"}
    ])

    res.status(200).json({data: count[0] || { unreadCount: 0 }});
    

})


const markAsRead= ErrorHandler.catchAsync( async (req: Request, res: Response)=>{
   
        const { notificationId } = req.params;
        await notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json({ message: 'Notification marked as read' });
    
})


export default { addNotification, getNotification, markAsRead };
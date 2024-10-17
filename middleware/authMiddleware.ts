import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, user } from "../models/userModel";
import { task } from "../models/taskModel";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, "secret_key", (error, user) => {
    if (error) return res.sendStatus(403);
    req.body.user = user;
    next();
  });
}

async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = req.body.user as IUser;
    const targetUser = await user.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "Not Found this user" });
    }
console.log(currentUser.supRole);
    
    if(currentUser.supRole.includes(targetUser.role)){
      next();
    }else{
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    
  } catch (error) {
    console.log("Error in authorize middleware");
    console.log(error);
  }
}

async function authorizeTask(req: Request, res: Response, next: NextFunction) {
  try {
   /// i need edit or delete task when i am create this task or i am admin or super admin
    const currentUser = req.body.user as IUser;
    const targetTask = await task.findById(req.params.id);
    if (!targetTask) {
      return res.status(404).json({ message: "Not Found this task" });
    }
    if (currentUser.role === "superAdmin" || currentUser.role === "admin" || targetTask.addedBy.toString() === (currentUser._id as unknown as string)) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    
    } catch (error) {
      console.log("Error in authorize middleware");
      console.log(error);
    }
  }

// async function authorize(req: Request, res: Response, next: NextFunction) {
//   try {
//     const currentUser = req.body.user;
//     const targetUser = await user.findById(req.params.id);

//     if (!targetUser) {
//       return res.status(404).json({ message: "Not Found this user" });
//     }

//     const rolePermissions = {
//       superAdmin: () => {
//         if(targetUser.role === "superAdmin"){
//           return res.status(403).json({ message: "You are not authorized to perform this action" });
//         }else{
//           next();
//         }
//       },
//       admin: () => {
//         if (targetUser.role !== "superAdmin" && targetUser.role !== "admin") {
//           next();
//         } else {
//           return res
//             .status(403)
//             .json({ message: "You are not authorized to perform this action" });
//         }
//       },
//       user: () =>
//         res
//           .status(403)
//           .json({ message: "You are not authorized to perform this action" }),
//     };

//     (rolePermissions[currentUser.role] || rolePermissions["user"])();
//   } catch (error) {
//     console.log("Error in authorize middleware");
//     console.log(error);
//   }
// }

export default { authenticateToken, authorize, authorizeTask };

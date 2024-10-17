import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { user } from "../models/userModel";
import ErrorHandler  from '../middleware/errorMiddleware';


 const register = ErrorHandler.catchAsync(async (req: Request, res: Response) => {
 
    const isExist = await user.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
 
});

const  login = ErrorHandler.catchAsync (async (req: Request, res: Response) => {
  
    const userExist = await user
      .findOne({ email: req.body.email })
      .select("+password");

    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userExist._id, role: userExist.role ,supRole:userExist.supRole}, "secret_key",);

    res.status(200).json({
      message: "Login successful",
      data: {
        token: token,
        user: {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        },
      },
    });
  
});




export default { register, login };
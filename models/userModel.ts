import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser  extends mongoose.Document{
    name: string;
    email: string;
    password: string;
    role: string;
    supRole:String[]
};


const userSchema= new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user",
    },
    supRole:{
      type: [String],
      default: []
    }
});

userSchema.pre('save', async function (next) {
  try{
    const user = this as IUser;
    if(user.role === "admin"){
      user.supRole.push("user");
    }
    if(user.role === "superAdmin"){
      user.supRole.push("user", "admin");
    }
    next();
  }catch(error){
    console.log(error);
    next(error);
  }
});

userSchema.pre('save', async function (next) {
  try {
      const user = this as IUser;

      if (user.isModified("password")) {
          user.password = await bcrypt.hash(user.password, 10);
      }
      next();
  } catch (error) {
      console.log(error);
      next(error);
  }
});

export const user= mongoose.model<IUser>("User", userSchema);
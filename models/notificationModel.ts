import mongoose from "mongoose";

export interface INotification extends mongoose.Document {
  message: string;
  user: any[];
  read: boolean;
  createAt: Date;
}

const notificationSchema = new mongoose.Schema<INotification>({
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  read: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const notification = mongoose.model<INotification>("notification", notificationSchema);
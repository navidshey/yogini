import { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

const schema: any = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
};
// Create Scheme
const UserSchema: Schema = new Schema(schema);

export const User: Model<IUser> = model<IUser>("User", UserSchema);

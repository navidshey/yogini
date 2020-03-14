import { Types } from "mongoose";
export interface IComment {
  _id?: string;
  user: Types.ObjectId;
  text: String;
  name: String;
  avatar: String;
  date?: Date;
}

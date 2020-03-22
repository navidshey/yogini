import { Document, model, Model, Schema, Types } from "mongoose";
import { IUser } from "./User";
import { IComment } from "./Icomment";
import { ILike } from "./ILike";

const schema: any = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: {
        type: String,
        require: true
      },
      name: {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
};

// Create Scheme
const PostSchema: Schema = new Schema(schema);

export interface IPost extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  text: string;
  name: string;
  avatar: string;
  likes: ILike[];
  comments: IComment[];
  date: Date;
}

export interface IpostErrors {
  text?: string;
  name?: string;
}

export const Post: Model<IPost> = model<IPost>("Post", PostSchema);

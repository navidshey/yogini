import { Document, model, Model, Schema, Types } from "mongoose";

const schema: any = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
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
  user: Types.ObjectId;
  text: String;
  name: String;
  avatar: String;
  likes: {
    user: Types.ObjectId;
  }[];
  comments: {
    _id?: string;
    user: Types.ObjectId;
    text: String;
    name: String;
    avatar: String;
    date?: Date;
  }[];
  date: Date;
}
// export const Post = mongoose.model("post", PostSchema);

export const Post: Model<IPost> = model<IPost>("Post", PostSchema);
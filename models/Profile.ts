// import * as mongoose from "mongoose";
import { Document, model, Model, Schema, Types } from "mongoose";
import { IUser } from "./User";
import { IExperience } from "./IExperience";
import { IEducation } from "./IEducation";
import { ISocial } from "./ISocial";

const schema: any = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
};
// Create Scheme
const ProfileSchema: Schema = new Schema(schema);

export interface IProfile extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  handle: string;
  company: string;
  website: string;
  location: String;
  status: String;
  skills: String;
  bio: String;
  githubusername: String;
  experience: IExperience[];
  education: IEducation[];
  social: ISocial;
  date: Date;
}

export interface IProfileErrors {
  handle?: string;
  status?: String;
  skills?: String;
  website?: string;
  youtube?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export const Profile: Model<IProfile> = model<IProfile>(
  "Profile",
  ProfileSchema
);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = {
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
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
const PostSchema = new mongoose_1.Schema(schema);
// export const Post = mongoose.model("post", PostSchema);
exports.Post = mongoose_1.model("Post", PostSchema);

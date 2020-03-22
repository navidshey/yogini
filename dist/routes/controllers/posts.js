"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const post_1 = require("../../models/post");
const Profile_1 = require("../../models/Profile");
const post_2 = require("./../../validation/post");
const errorMessages_1 = require("../../config/errorMessages");
class PostController {
    get(req, res) {
        post_1.Post.find()
            .sort({ date: -1 })
            .then(posts => res.json(posts))
            .catch(err => res.status(404).json({ noPostsFound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
    }
    getById(req, res) {
        post_1.Post.findById(req.params.id)
            .then(posts => res.json(posts))
            .catch(err => res
            .status(404)
            .json({ noPostFound: errorMessages_1.PostErrorMessages.Post_Not_Found_With_Id }));
    }
    create(req, res) {
        const { errors, isValid } = post_2.validatePostInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newPost = new post_1.Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });
        newPost.save().then(post => {
            res.json(post);
        });
    }
    delete(req, res) {
        Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
            post_1.Post.findById(req.params.id, (err, post) => {
                // check for post owner
                if (post.user.toString() !== req.user.id) {
                    return res
                        .status(401)
                        .json({ notAuthorize: errorMessages_1.UserErrorMessage.Not_Authorize });
                }
                // Delete post
                post.remove().then(() => res.json({ success: true }));
            }).catch(err => res.status(404).json({ postnotfound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
        });
    }
    likePost(req, res) {
        Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
            post_1.Post.findById(req.params.id, (err, post) => {
                if (post.likes.filter(like => like.user.toString() === req.user.id)
                    .length > 0) {
                    return res
                        .status(400)
                        .json({ alreadyLiked: errorMessages_1.PostErrorMessages.User_Already_Liked });
                }
                // Add user id  to like array
                post.likes.unshift({ user: mongoose.Types.ObjectId(req.user.id) });
                post.save().then(post => res.json(post));
            }).catch(err => res.status(404).json({ postnotfound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
        });
    }
    unlikePost(req, res) {
        Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
            post_1.Post.findById(req.params.id, (err, post) => {
                if (post.likes.filter(like => like.user.toString() === req.user.id)
                    .length === 0) {
                    return res
                        .status(400)
                        .json({ alreadyLiked: errorMessages_1.PostErrorMessages.Not_Liked_Yet });
                }
                // Get the removed index
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);
                //splice out of array
                post.likes.splice(removeIndex, 1);
                post.save().then(post => res.json(post));
            }).catch(err => res.status(404).json({ postnotfound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
        });
    }
    addComment(req, res) {
        const { errors, isValid } = post_2.validatePostInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        post_1.Post.findById(req.params.id)
            .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: mongoose.Types.ObjectId(req.user.id)
            };
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));
        })
            .catch(err => res.status(404).json({ postnotfound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
    }
    removeComment(req, res) {
        post_1.Post.findById(req.params.id)
            .then(post => {
            // check to see if comment exist
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res
                    .status(404)
                    .json({ commentnotexist: errorMessages_1.PostErrorMessages.Comment_Not_Exist });
            }
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        })
            .catch(err => res.status(404).json({ postnotfound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
    }
}
exports.default = PostController;

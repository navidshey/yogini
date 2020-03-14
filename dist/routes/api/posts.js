"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
// Post model
const post_1 = require("../../models/post");
const Profile_1 = require("../../models/Profile");
// Post validation
const post_2 = require("./../../validation/post");
const errorMessages_1 = require("../../config/errorMessages");
// @route   Get api/posts
// @test    Get post
// @access  public
router.get("/", (req, res) => {
    post_1.Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPostsFound: errorMessages_1.PostErrorMessages.Post_Not_Found }));
});
// @route   Get api/posts/:id
// @test    Get post by id
// @access  public
router.get("/:id", (req, res) => {
    post_1.Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res
        .status(404)
        .json({ noPostFound: errorMessages_1.PostErrorMessages.Post_Not_Found_With_Id }));
});
// @route   Post api/posts
// @test    Create post
// @access  private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
// @route   Delete api/posts/:id
// @test    Delete post by id
// @access  private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
// @route   Post api/posts/like/:id
// @test    Like post by id
// @access  private
router.post("/like/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
// @route   Post api/posts/unlike/:id
// @test    unLike post by id
// @access  private
router.post("/unlike/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
// @route   Post api/posts/comment/:id
// @test    add comment to post
// @access  private
router.post("/comment/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
// @route   Delete api/posts/comment/:id/:comment_id
// @test    remove comment from post
// @access  private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
});
module.exports = router;

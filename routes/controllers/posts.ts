import * as mongoose from "mongoose";
import { Post, IPost } from "../../models/post";
import { Profile, IProfile } from "../../models/Profile";
import { validatePostInput } from "./../../validation/post";
import {
  PostErrorMessages,
  UserErrorMessage
} from "../../config/errorMessages";
import { IComment } from "../../models/Icomment";

export default class PostController {
  public get(req, res) {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err =>
        res.status(404).json({ noPostsFound: PostErrorMessages.Post_Not_Found })
      );
  }

  public getById(req, res) {
    Post.findById(req.params.id)
      .then(posts => res.json(posts))
      .catch(err =>
        res
          .status(404)
          .json({ noPostFound: PostErrorMessages.Post_Not_Found_With_Id })
      );
  }

  public create(req, res) {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost: IPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }

  public delete(req, res) {
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      Post.findById(req.params.id, (err: any, post: IPost) => {
        // check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notAuthorize: UserErrorMessage.Not_Authorize });
        }

        // Delete post
        post.remove().then(() => res.json({ success: true }));
      }).catch(err =>
        res.status(404).json({ postnotfound: PostErrorMessages.Post_Not_Found })
      );
    });
  }

  public likePost(req, res) {
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      Post.findById(req.params.id, (err: any, post: IPost) => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: PostErrorMessages.User_Already_Liked });
        }

        // Add user id  to like array
        post.likes.unshift({ user: mongoose.Types.ObjectId(req.user.id) });

        post.save().then(post => res.json(post));
      }).catch(err =>
        res.status(404).json({ postnotfound: PostErrorMessages.Post_Not_Found })
      );
    });
  }

  public unlikePost(req, res) {
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      Post.findById(req.params.id, (err: any, post: IPost) => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: PostErrorMessages.Not_Liked_Yet });
        }

        // Get the removed index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //splice out of array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      }).catch(err =>
        res.status(404).json({ postnotfound: PostErrorMessages.Post_Not_Found })
      );
    });
  }

  public addComment(req, res) {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment: IComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: mongoose.Types.ObjectId(req.user.id)
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: PostErrorMessages.Post_Not_Found })
      );
  }

  public removeComment(req, res) {
    Post.findById(req.params.id)
      .then(post => {
        // check to see if comment exist

        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: PostErrorMessages.Comment_Not_Exist });
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: PostErrorMessages.Post_Not_Found })
      );
  }
}

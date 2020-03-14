import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import { IComment } from "../../store/types";

type Prop = {
  comments: IComment[];
  postId: string;
};

class CommentFeed extends Component<Prop, any> {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

(CommentFeed as any).propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;

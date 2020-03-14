import React, { Component } from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import { IPost } from "../../store/types";

type Prop = {
  posts?: IPost[];
};

class PostFeed extends Component<Prop, any> {
  render() {
    const { posts } = this.props;

    return posts && posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

(PostFeed as any).propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;

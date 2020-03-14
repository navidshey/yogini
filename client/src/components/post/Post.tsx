import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./../common/spinner";
import { getPost } from "../../store/actions/postActions";
import { postState } from "../../store/types";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

interface StateProps {
  post: postState;
}

interface mapDispatch {
  getPost: (id: string) => any;
}

interface State {}

type Prop = State & StateProps & mapDispatch & RouteComponentProps;

class Post extends Component<Prop, any> {
  componentDidMount() {
    this.props.getPost((this.props.match.params as any).id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
(Post as any).propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);

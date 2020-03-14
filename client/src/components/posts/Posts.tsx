import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/spinner";
import { postState } from "../../store/types";
import { getPosts } from "./../../store/actions/postActions";

interface StateProps {
  post: postState;
}

interface mapDispatch {
  getPosts: () => postState;
}

interface State {
  text?: string;
  errors?: {};
}

type Prop = State & StateProps & mapDispatch & any;

class Posts extends Component<Prop, any> {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Posts as any).propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);

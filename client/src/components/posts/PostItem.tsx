import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../store/actions/postActions";
import { AuthState, IPost, ILike } from "../../store/types";

interface StateProps {
  auth: AuthState;
}

interface mapDispatch {
  deletePost: (id: string) => void;
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
}

interface State {
  post: IPost;
  showActions?: boolean;
}

type Prop = State & StateProps & mapDispatch;

class PostItem extends Component<Prop, State> {
  public static defaultProps = {
    showActions: true
  };

  componentWillReceiveProps(nextProps: Prop) {
    if (nextProps.post) {
      this.setState({ post: nextProps.post });
    }
  }

  onDeleteClick(id: string) {
    this.props.deletePost(id);
  }

  onLikeClick(id: string) {
    this.props.addLike(id);
  }

  onUnlikeClick(id: string) {
    this.props.removeLike(id);
  }

  findUserLike(likes: ILike[]) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === (auth.user as any).id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  isCurrentUserLike(likes: ILike[]) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === (auth.user as any).id).length > 0) {
      return <i className="fas fa-thumbs-up text-info" />;
    } else {
      return <i className="fas fa-thumbs-up" />;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <span> {this.isCurrentUserLike(post.likes)}</span>
                  {/* <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  /> */}
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === (auth.user as any).id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

(PostItem as any).propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);

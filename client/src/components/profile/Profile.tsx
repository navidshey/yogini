import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import Spinner from "./../common/spinner";
import { getProfileByHandle } from "../../store/actions/profileActions";
import { profileState } from "../../store/types";
import { ApplicationRoutes } from "../../constants";

interface StateProps {
  profile: profileState;
}

interface mapDispatch {
  getProfileByHandle: (handle: string) => any;
}

interface State {}

type Prop = State & StateProps & mapDispatch & RouteComponentProps;

class Profile extends Component<Prop, any> {
  componentDidMount() {
    if ((this.props.match.params as any).handle) {
      this.props.getProfileByHandle((this.props.match.params as any).handle);
    }
  }
  componentWillReceiveProps(nextProp: StateProps) {
    if (nextProp.profile.profile === null && this.props.profile.loading) {
      this.props.history.push(ApplicationRoutes.NOTFOUND);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (!profile || profile == null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to={ApplicationRoutes.PROFILES}
                className="btn btn-light mb-3 float-left"
              >
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

(Profile as any).propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};
const mapStateToProps = (state: StateProps) => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);

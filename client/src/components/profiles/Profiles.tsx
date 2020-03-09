import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner";
import { getProfiles } from "../../store/actions/profileActions";
import { profileState, IProfile } from "../../store/types";
import ProfileItem from "./ProfileItem";

interface StateProps {
  profile: profileState;
}

interface mapDispatch {
  getProfiles: () => any;
}

interface State {}

type Prop = State & StateProps & mapDispatch;

class Profiles extends Component<Prop, State> {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (!profiles || profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile: IProfile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found ...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Profiles as any).propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

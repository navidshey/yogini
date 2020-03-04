import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { getCurrentProfile } from "./../../store/actions/profileActions";
import { AuthState, profileState } from "../../store/types";
import { ApplicationRoutes } from "../../constants";

interface StateProps {
  profile: profileState;
  auth: AuthState;
}

interface mapDispatch {
  getCurrentProfile: () => any;
}

type State = {};

type Props = StateProps & mapDispatch;

class Dashboard extends Component<Props, any> {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || !profile || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (profile && Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: Display Profile</h4>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user && user.name} </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link
              to={ApplicationRoutes.CREATEPROFILE}
              className="btn btn-lg btn-info"
            >
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Dashboard as any).propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  profile: state.profile,
  auth: state.auth
});

// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
//   return bindActionCreators({ getCurentProfile: getCurrentProfile }, dispatch);
// };

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

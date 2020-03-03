import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { getCurrentProfile } from "./../../store/actions/profileActions";
import { AuthState, profileState } from "../../store/types";

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
    const user = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = <h1>Hello</h1>;
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

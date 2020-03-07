import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthState } from "../../store/types";
import { ApplicationRoutes } from "../../constants";
import { RouteComponentProps } from "react-router-dom";

interface StateProps {
  auth: AuthState;
}

type Prop = StateProps & RouteComponentProps;

class Landing extends Component<Prop, any> {
  componentDidMount() {
    if (this.props.auth.isAuthenticatd) {
      this.props.history.push(ApplicationRoutes.DASHBOARD);
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Landing as any).propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);

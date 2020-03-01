import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { logoutUser } from "./../../store/actions/authActions";
import { AuthState } from "../../store/types";
import { ApplicationRoutes } from "../../constants";

interface StateProps {
  auth: AuthState;
}

interface mapDispatch {
  logoutUser: () => any;
}

type Props = StateProps & mapDispatch;

class Navbar extends Component<Props, any> {
  onLogoutClick(e: any) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticatd, user } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to={ApplicationRoutes.REGISTER}>
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={ApplicationRoutes.LOGIN}>
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user ? user.avatar : ""}
              alt={user ? user.name : ""}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to={ApplicationRoutes.ROOT}>
              DevConnector
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={ApplicationRoutes.PROFILE}>
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            {isAuthenticatd ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

(Navbar as any).PropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch<AuthState>) => {
  return bindActionCreators({ logoutUser: logoutUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

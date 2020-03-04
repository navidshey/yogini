//https://tylermcginnis.com/react-router-protected-routes-authentication/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ApplicationRoutes } from "../../constants";

const PrivateRoute = ({ component: Component, auth, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticatd === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={ApplicationRoutes.LOGIN} />
      )
    }
  />
);

(PrivateRoute as any).PropTypes = {
  auh: PropTypes.object.isRequired
};

const mapStaeToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStaeToProps)(PrivateRoute);

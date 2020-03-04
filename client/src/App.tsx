import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import { IUser } from "./store/types";
import store from "./store/store";

import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ApplicationRoutes } from "./constants/applicationRoutes";
import "./App.css";
import { clearCurrentProfile } from "./store/actions/profileActions";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";

//This is for reloading the page to user stay loged in
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode<IUser>(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = ApplicationRoutes.LOGIN;
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path={ApplicationRoutes.ROOT} component={Landing} />
          <div className="container">
            <Route
              exact
              path={ApplicationRoutes.REGISTER}
              component={Register}
            />
            <Route exact path={ApplicationRoutes.LOGIN} component={Login} />
            <PrivateRoute
              exact
              path={ApplicationRoutes.DASHBOARD}
              component={Dashboard}
            />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

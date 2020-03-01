import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
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

//This is for reloading the page to user stay loged in
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode<IUser>(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //TODO: Session timeout
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   window.location.href = ApplicationRoutes.LOGIN;
  // }
}

// const App = ()=>{
//   <Provider store={store}>
//   <Router>
//     <div className="App">
//       <div>
//         {errors && <span>Error Occure</span> }
//       </div>
//       <NavBar />
//       <Route exact path="/" component={Landing} />
//       <div className="container">
//         <Route exact path="/register" component={Register} />
//         <Route exact path="/login" component={Login} />
//       </div>
//       <Footer />
//     </div>
//   </Router>
// </Provider>
// }

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* {errors && <span>Error Occure</span> } */}

          <NavBar />
          <Route exact path={ApplicationRoutes.ROOT} component={Landing} />
          <div className="container">
            <Route
              exact
              path={ApplicationRoutes.REGISTER}
              component={Register}
            />
            <Route exact path={ApplicationRoutes.LOGIN} component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}
// const mapStateToProps = (state: any) => ({
//   errors: state.errors
// });

// export default connect(mapStateToProps)(App);
export default App;

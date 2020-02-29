import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./store/store";

import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

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
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
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

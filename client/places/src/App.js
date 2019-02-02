import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Favourite from "./components/favourite/Favourite";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import SearchComponent from "./components/search/SearchComponent";
import { Provider } from "react-redux";
import store from "./store";
import AddFavDialog from "./components/favourite/AddFavDialog";

// Check For the token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAthunticated
  store.dispatch(setCurrentUser(decoded));
  // Check for the expired token
  const currentTime = Date.now / 1000;
  if (localStorage.expired < currentTime) {
    store.dispatch(logoutUser);
    //TODO:
    // Clear the profile if exist
    // Redirect to login
    window.location.href = "/"; // ? this.props.history.push('/login');
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div
            className="App"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={SearchComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/favourite" component={Favourite} />
            <div style={{ justifyContent: "flex-end" }}>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

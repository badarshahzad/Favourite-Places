import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import Typography from "@material-ui/core/Typography";
import { getAllFavourite } from "../../actions/favouritAction";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();

    this.props.history.push("/");
  }

  onFavouritList(e) {
    e.preventDefault();
    this.props.history.push("/favourite");

    // this.props.getAllFavourite();

    console.log(
      "This is the favourite list: " +
        JSON.stringify(this.props.favourite.allFavourite)
    );
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: 25, marginRight: 8 }}
              title="You must have a Gravatar connected to your emailto display image"
            />
          </li>
          <li className="nav-item">
            <a href="#" onClick={this.onFavouritList.bind(this)}>
              <Typography
                variant="display1"
                style={{
                  fontSize: 14,
                  color: "#fff",
                  marginTop: 6,
                  marginRight: 12,
                  marginLeft: 12
                }}
              >
                {" "}
                Favourit
              </Typography>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={this.onLogoutClick.bind(this)}>
              <Typography
                variant="display1"
                style={{ fontSize: 14, color: "#fff", marginTop: 6 }}
              >
                {" "}
                Logout
              </Typography>
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              FavPlaces
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAllFavourite: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  favourite: state.favourite
});

export default connect(
  mapStateToProps,
  { logoutUser, getAllFavourite }
)(withRouter(Navbar));

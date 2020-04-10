import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser, logout, openModal }) => {
  if (currentUser) {
    return (
      <div className="navbar-div">
        <div className="navbar-content">
          <Link to="/">
            <div className="stereo-icon-div">
              <h1 className="stereo-icon">(((Stereo)))</h1>
            </div>
          </Link>
          <div className="navbar-buttons">
            <button className="sign-out-button" onClick={() => logout()}>
              Sign out
            </button>
            <Link className="upload-button" to="/upload">
              Upload
            </Link>
            <Link to={`/users/${currentUser.id}`}>
              <img
                className="profile-pic-thumbnail"
                src="https://i.pinimg.com/originals/8f/15/5c/8f155c9323941657c157c3ce8e4df589.jpg"
                alt="profile-picture"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-div">
        <div className="navbar-content">
          <Link to="/">
            <div className="stereo-icon-div">
              <h1 className="stereo-icon">(((Stereo)))</h1>
            </div>
          </Link>
          <div className="navbar-buttons">
            <button
              className="sign-in-button"
              onClick={() => openModal("login")}
            >
              Sign in
            </button>
            <button
              className="create-account-button"
              onClick={() => openModal("signup")}
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;

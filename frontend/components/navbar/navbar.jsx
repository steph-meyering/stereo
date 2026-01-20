import React from "react";
import { Link, Redirect } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.redirect = false;
  }
  
  render(){
    const {currentUser, logout, openModal} = this.props;
    let redirect = null
    if (currentUser) {
      if (this.redirect) {
        this.redirect = false;
        redirect = <Redirect to={`/users/${currentUser.id}`} />
      }
      return (
        <div className="navbar-div">
          {redirect}
          <div className="navbar-content">
            <Link to="/">
              <div className="stereo-icon-div">
                <h1 className="stereo-icon">(((Stereo)))</h1>
              </div>
            </Link>
            <div className="navbar-buttons">
              <button
                className="sign-out-button"
                onClick={() => {
                  logout();
                  this.redirect = true;
                }}
              >
                <span>Sign out</span>
              </button>
              <Link className="upload-button" to="/upload">
                <span>Upload</span>
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
                onClick={() => {
                  this.redirect = true;
                  openModal("login")
                }}
              >
                <span>Sign in</span>
              </button>
              <button
                className="create-account-button"
                onClick={() => openModal("signup")}
              >
                <span>Create account</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Navbar;

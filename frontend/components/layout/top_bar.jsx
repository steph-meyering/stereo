import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/theme_toggle";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search:", this.state.searchQuery);
  }

  render() {
    const { currentUser, logout, openModal } = this.props;

    return (
      <div className="topbar">
        <div className="topbar-content">
          {/* Logo */}
          <Link to="/" className="topbar-logo">
            <span className="logo-full">(((Stereo)))</span>
            <span className="logo-mobile">(((S)))</span>
          </Link>

          {/* Search */}
          <form className="topbar-search" onSubmit={this.handleSearch}>
            <input
              type="text"
              placeholder="Search artists, tracks..."
              value={this.state.searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          {/* Right side actions */}
          <div className="topbar-actions">
            <ThemeToggle />
            
            {currentUser ? (
              <>
                <Link to="/upload" className="topbar-button upload-btn">
                  <span>Upload</span>
                </Link>
                <Link to={`/users/${currentUser.id}`} className="topbar-avatar">
                  <img
                    src="https://i.pinimg.com/originals/8f/15/5c/8f155c9323941657c157c3ce8e4df589.jpg"
                    alt="Profile"
                  />
                </Link>
              </>
            ) : (
              <button
                className="topbar-button signup-btn"
                onClick={() => openModal("signup")}
              >
                Sign up
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;

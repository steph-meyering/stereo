import React from "react";
import UserSidebar from "./user_sidebar";
import SongIndexContainer from "../songs/song_index_container";
class UserShow extends React.Component {
  componentDidMount() {
    this.props.requestUser(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.requestUser(this.props.match.params.userId);
    }
  }

  render() {
    if (this.props.user === undefined) return null;
    return (
      <div className="user-show-page">
        <div className="user-show-div">
          <img
            className="profile-pic"
            src="https://i.pinimg.com/originals/8f/15/5c/8f155c9323941657c157c3ce8e4df589.jpg"
            alt="profile-picture"
          />
          <div className="name-location">
            <h2 className="username">{this.props.user.username}</h2>
            <h3 className="location">{this.props.user.location}</h3>
          </div>

          {/* <h3>Bio: {this.props.user.about} </h3> */}
        </div>
        <h1>Recent Activity</h1>
        <div className="songs-and-sidebar">
          <SongIndexContainer />
          <div className="sidebar-main">
            <UserSidebar user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserShow;

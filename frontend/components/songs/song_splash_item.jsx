import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class SongSplashItem extends React.Component {
  
  render() {
    // // causes an error without this if statement
    // if (this.props.song === undefined) return null;
    return (
      <div className="song-splash-item">
        <Link to={`/songs/${this.props.song.id}`}>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </Link>
        <div
          className="play-button"
          onClick={() => this.props.selectSong(this.props.song)}
        ></div>
        <div className="splash-song-info">
          <Link to={`/songs/${this.props.song.id}`}>
            <h3>{this.props.song.title}</h3>
          </Link>
          <Link to={`/users/${this.props.song.artistId}`}>
            <h3>{this.props.song.artist}</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default SongSplashItem;

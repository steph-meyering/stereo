import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class SongIndexItem extends React.Component {
  render() {
    // // causes an error without this if statement
    if (this.props.song === undefined) return null;
    return (
      <div className="song-index-item">
        <Link to={`/songs/${this.props.song.id}`}>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </Link>
        <div className="info-and-wave">
          <div className="song-index-info">
            <div
              className="play-button"
              onClick={() => this.props.selectSong(this.props.song)}
            ></div>
            <div>
              <Link to={`/users/${this.props.song.artistId}`}>
                {this.props.song.artist}
              </Link>
              <h3>{this.props.song.title}</h3>
            </div>
          </div>
          <div className="waveform"></div>
        </div>
      </div>
    );
  }
}

export default SongIndexItem;

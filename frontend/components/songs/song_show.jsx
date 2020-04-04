import React from "react";

class SongShow extends React.Component {
  componentDidMount() {
    ``;
    this.props.fetchSong(this.props.match.params.songId);
  }

  render() {
    // causes an error without this if statement
    if (this.props.song === undefined) return null;
    return (
      <div className="song-show-page">
        <div className="song-show-top">
          <div className='song-show-left'>
            <div
              className="play-button"
              onClick={() => this.props.selectSong(this.props.song)}
            ></div>
            <p>{this.props.song.artist}</p>
            <h1>{this.props.song.title}</h1>
            <div className="waveform"></div>
          </div>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </div>
      </div>
    );
  }
}

export default SongShow;

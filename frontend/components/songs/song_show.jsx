import React from "react";
import { initWave } from "../../util/waveform_util";
import CommentContainer from "../comments/comment_container";
import CommentForm from "../comments/comment_form";
import WaveFormContainer from "../waveform/waveform_container";

class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selected = false;
    this.playing = false;
  }

  componentDidMount() {
    this.props
      .fetchSong(this.props.match.params.songId)
  }

  render() {
    if (this.props.song === undefined) return null;
    if (this.props.currentlyPlaying) {
      // set flag specifying if current song is already active in player
      this.selected = this.props.song.id === this.props.currentlyPlaying.id;
      // flag to determine button appearance (play / pause)
      this.playing = this.props.currentlyPlaying.playing;
    }

    return (
      <div className="song-show-page">
        <div className="song-show-top">
          <div className="song-show-left">
            <div className="name-artist-play">
              <div
                className={
                  this.selected && this.playing ? "pause-button" : "play-button"
                }
                onClick={() => {
                  // if song has already been selected, button will play/pause instead
                  if (this.selected) {
                    this.props.playPauseSong();
                  } else {
                    let progress = document.getElementById("progress-bar");
                    if (progress) {
                      // if another song is playing, reset progress bar to zero
                      progress.value = 0;
                    }
                    // send selected song to play controls element...
                    this.props.selectSong(this.props.song);
                  }
                }}
              ></div>
              <div className="name-artist">
                <h3 className="username">{this.props.song.artist}</h3>
                <h2 className="song-show-title">{this.props.song.title}</h2>
              </div>
            </div>
            <WaveFormContainer
              container={`wave-${this.props.song.id}`}
              song={this.props.song}
              selected={this.selected}
            />
          </div>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </div>
        <CommentForm songId={this.props.song.id} />
        <CommentContainer songId={this.props.song.id} />
      </div>
    );
  }
}

export default SongShow;

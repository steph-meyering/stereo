import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import WaveFormContainer from "../waveform/waveform_container";


class SongIndexItem extends React.Component {
  constructor(props) {
  super(props);
    this.selected = false;
    this.playing = false;
  }

  edit() {
    this.props.openModal("edit-song");
    // Store the target song's id in localStorage in order to access from a different component
    window.localStorage.setItem("editTarget", this.props.song.id);
  }


  render() {
    // Render null if props don't contain song data
    if (this.props.song === undefined) return null;

    let editButton = this.props.ownSong ? (
      <button onClick={() => this.edit()}>edit</button>
    ) : null;

    let selected = this.props.isSelected;
    let playing = this.props.isPlaying; // FIXME

    return (
      <div className="song-index-item">
        <Link to={`/songs/${this.props.songId}`}>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </Link>
        <div className="info-and-wave">
          <div className="song-index-info">
            <div
              className={selected && playing ? "pause-button" : "play-button"}
              onClick={() => {
                if (selected) {
                  this.props.playPauseSong();
                } else {
                  let progress = document.getElementById("progress-bar");
                  if (progress) {
                    // if another song is playing, reset progress bar to zero
                    progress.value = 0;
                  }
                  this.props.selectSong(this.props.song);
                }
              }}
            ></div>
            <div>
              <Link to={`/users/${this.props.song.artistId}`}>
                {this.props.song.artist}
              </Link>
              <h3>{this.props.song.title}</h3>
            </div>
          </div>
          <WaveFormContainer
            container={`wave-${this.props.song.id}`}
            song={this.props.song}
            selected={this.selected}
          />
          {editButton}
        </div>
      </div>
    );
  }
}

export default SongIndexItem;

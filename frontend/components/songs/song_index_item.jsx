import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";


class SongIndexItem extends React.Component {
  constructor(props) {
  super(props);
    this.localSeek = false;
    this.selected = false;
    this.playing = false;
    this.interactiveWave = false;
    this.state = {
      songId: this.props.song.id,
    };
    this.responsiveWave = this.responsiveWave.bind(this);
    this.syncWave = this.syncWave.bind(this);
  }

  componentDidMount() {
    this.renderWave();
  }

  componentDidUpdate() {
    if (!this.props.currentlyPlaying) {
      return;
    }
    // seek waveform if incoming seek action originates from playControls
    let isPlaying = this.state.songId === this.props.currentlyPlaying.id
    if (!isPlaying){
      return;
    }
    let seek = this.props.currentlyPlaying.seek;
    if (seek && seek.origin === "playControls") {
      return this.state.wave.seekTo(seek.position);
    }
  }

  responsiveWave() {
    this.state.wave.drawBuffer();
  }

  renderWave() {
    if (this.props.song.waveform === "undefined") {
      console.warn("Waveform data has been corrupted");
      return null;
    }
    let wave = WaveSurfer.create({
      container: `#wave-${this.state.songId}`,
      height: 100,
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
      fillParent: true,
      minPxPerSec: 10,
    });

    if (this.props.song.waveform) {
      wave.load(this.props.song.fileUrl, JSON.parse(this.props.song.waveform));
      wave.setMute(true);
      this.setState({ wave });
      window.addEventListener(
        "resize",
        wave.util.debounce(this.responsiveWave),
        1000
      );
    } else {
      return null;
      //   wave.load(this.props.song.fileUrl);
      //   wave.on("ready", () =>
      //     wave
      //       .exportPCM(1024, 10000, true)
      //       .then((res) => this.setState({ waveform: res }))
      //       .then(() => console.log('hello jello'))
      //   );
      //   console.log("load song and calc waveform data");
    }
  }

  edit() {
    this.props.openModal("edit-song");
    // Store the target song's id in localStorage in order to access from a different component
    window.localStorage.setItem("editTarget", this.props.song.id);
  }

  syncWave() {
    if (!this.state.wave) {
      return;
    }
    // get the progress element so we can obtain it's value
    let progress = document.getElementById("progress-bar");
    if (progress) {
      // seek waveform to same percentage as progress element
      this.state.wave.seekTo(progress.value);
      console.log(`seek to ${progress.value}`);
    }
    // check state and initialize waveform playback if song is playing
    if (this.props.isPlaying) { // FIXME
      this.state.wave.play();
    } else {
      this.state.wave.pause();
    }
  }

  render() {
    // Render null if props don't contain song data
    if (this.props.song === undefined) return null;

    let editButton = this.props.ownSong ? (
      <button onClick={() => this.edit()}>edit</button>
    ) : null;

    let selected = this.props.isSelected;
    let playing = this.props.isPlaying; // FIXME

    if (selected) {
      // if song is in currentlyPlaying slice of state, sync waveform
      this.syncWave();
    } else if (this.state.wave) {
      this.state.wave.pause();
      this.state.wave.seekTo(0);
    }

    return (
      <div className="song-index-item">
        <Link to={`/songs/${this.state.songId}`}>
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
          <div id={`wave-${this.props.song.id}`} className="waveform"></div>
          {editButton}
        </div>
      </div>
    );
  }
}

export default SongIndexItem;

import React from "react";
import WaveSurfer from "wavesurfer.js";

class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.responsiveWave = this.responsiveWave.bind(this);
    this.syncWave = this.syncWave.bind(this);
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchSong(this.props.match.params.songId)
      .then(() => this.renderWave());
  }

  seek(pos) {
    console.log('seek event triggered')
    this.props.seek('waveform', pos);
  }

  renderWave() {
    let wave = WaveSurfer.create({
      container: "#song-show-waveform",
      height: 100,
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
      fillParent: true,
      minPxPerSec: 10,
      barMinHeight: 1,
    });
    if (this.props.song.waveform) {
      wave.load(this.props.song.fileUrl, JSON.parse(this.props.song.waveform));
      wave.setMute(true);
      wave.on("seek", (pos) => this.seek(pos));
      this.setState({ wave });
      window.addEventListener(
        "resize",
        wave.util.debounce(this.responsiveWave),
        2000
      );
    } else {
      return null;
    }
  }

  responsiveWave() {
    this.state.wave.drawBuffer();
  }

  syncWave() {
    if (!this.state.wave) {
      return;
    }
    // let newPos = this.props.currentlyPlaying.seek;
    // if (newPos){;
    //   this.state.wave.seekTo(newPos);
    // }
    // get the progress element so we can obtain it's value
    // let progress = document.getElementById("progress-bar");
    // if (progress) {
    //   // seek waveform to same percentage as progress element
    //   this.state.wave.seekTo(progress.value);
    //   console.log(`seek to ${progress.value}`);
    // }
    // check state and initialize waveform playback if song is playing
    if (this.props.currentlyPlaying.playing) {
      this.state.wave.play();
    } else {
      this.state.wave.pause();
    }
  }

  render() {
    if (this.props.song === undefined) return null;
    let selected = false;
    let playing = false;
    if (this.props.currentlyPlaying) {
      // set flag specifying if current song is already active in player
      selected = this.props.song.id === this.props.currentlyPlaying.id;
      // flag to determine button appearance (play / pause)
      playing = this.props.currentlyPlaying.playing;
    }
    console.log("selected :", selected);
    console.log("playing :", playing);
    if (selected) {
      // if song is in currentlyPlaying slice of state, sync waveform
      this.syncWave();
    }
    return (
      <div className="song-show-page">
        <div className="song-show-top">
          <div className="song-show-left">
            <div className="name-artist-play">
              <div
                className={selected && playing ? "pause-button" : "play-button"}
                onClick={() => {
                  // if song has already been selected, button will play/pause instead
                  if (selected) {
                    this.props.playPauseSong();
                  } else {
                    let progress = document.getElementById("progress-bar");
                    if (progress) {
                      // if another song is playing, reset progress bar to zero
                      progress.value = 0;
                    }
                    // send selected song to play controls element
                    this.props.selectSong(this.props.song);
                  }
                }}
              ></div>
              <div className="name-artist">
                <h3 className="username">{this.props.song.artist}</h3>
                <h2 className="song-show-title">{this.props.song.title}</h2>
              </div>
            </div>
            <div id="song-show-waveform"></div>
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

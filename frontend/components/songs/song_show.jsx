import React from "react";
import WaveSurfer from "wavesurfer.js";

class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.localSeek = false;
    this.selected = false;
    this.playing = false;
    this.interactiveWave = false;
    this.responsiveWave = this.responsiveWave.bind(this);
    this.syncWave = this.syncWave.bind(this);
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchSong(this.props.match.params.songId)
      .then(() => this.renderWave());
  }

  componentDidUpdate() {
    if (!this.props.currentlyPlaying) {
      return;
    }
    // seek waveform if incoming seek action originates from playControls
    let seek = this.props.currentlyPlaying.seek;
    if (seek && seek.origin === "playControls") {
      return this.state.wave.seekTo(seek.position);
    }
  }

  makeWaveInteractive(){
    // if waveform is displayed but not active, first click will play
    if (!this.interactiveWave) {
      this.state.wave.toggleInteraction();
      this.interactiveWave = true;
      this.props.selectSong(this.props.song);
      this.selected = true;
    }
  }
  
  seek(pos) {
    // if song isn't currently selected, first click will select song and seek to beginning
    if (!this.selected){
      this.selected = true;
      this.localSeek = false;
      this.props.selectSong(this.props.song);
      this.state.wave.seekTo(0);
      return
    }

    // only dispatch seek action if originating from waveform
    if (this.localSeek) {
      this.localSeek = false;
      this.props.seek("waveform", pos);
    }
  }

  renderWave() {
    let wave = WaveSurfer.create({
      container: "#song-show-waveform",
      backend: "MediaElement",
      height: 100,
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
      fillParent: true,
      minPxPerSec: 10,
      barMinHeight: 1,
      interact: false
    });
    if (this.props.song.waveform) {
      wave.load(this.props.song.fileUrl, JSON.parse(this.props.song.waveform));
      wave.setMute(true);
      wave.on("seek", (pos) => this.seek(pos));
      wave.on("ready", () => this.syncWave());
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
    console.log("waveform ready event");
    // nothing to sync if song isn't selected
    if (!this.selected || !this.state.wave) {
      return;
    }
    // get the progress element so we can obtain it's value
    let progress = document.getElementById("progress-bar");
    if (progress) {
      // seek waveform to same percentage as progress element
      this.state.wave.seekTo(progress.value);
      console.log(`seek to ${progress.value}`);
    }
  }

  render() {
    if (this.props.song === undefined) return null;
    if (this.props.currentlyPlaying) {
      // set flag specifying if current song is already active in player
      this.selected = this.props.song.id === this.props.currentlyPlaying.id;
      // flag to determine button appearance (play / pause)
      this.playing = this.props.currentlyPlaying.playing;
    }
    if (this.selected && this.state.wave) {
      // initialize waveform playback if song is playing
      if (this.playing) {
        this.state.wave.play();
      } else {
        this.state.wave.pause();
      }
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
            <div
              id="song-show-waveform"
              onClick={() => {
                if (!this.selected){
                  this.makeWaveInteractive();
                } else{
                  this.localSeek = true;
                }
              }}
            ></div>
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

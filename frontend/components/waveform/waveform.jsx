import React from "react";
import { initWave } from "../../util/waveform_util";

class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.wave = null;
    this.localSeek = false;
    this.selected = this.props.selected;
    this.playing = false;
    this.interactiveWave = false;
    this.makeWaveInteractive = this.makeWaveInteractive.bind(this);
    this.syncWave = this.syncWave.bind(this);
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    this.wave = initWave("#song-show-wave");
    this.wave.load(
      this.props.song.fileUrl,
      JSON.parse(this.props.song.waveform)
    );
    this.wave.on("ready", () => this.syncWave());
    this.wave.on("seek", (pos) => this.seek(pos));
  }

  componentDidUpdate() {
    this.selected = this.props.currentlyPlaying.id === this.props.song.id;
    this.playing = this.props.currentlyPlaying.playing;

    // seek waveform if incoming seek action originates from playControls
    let seek = this.props.currentlyPlaying.seek;
    if (seek && seek.origin === "playControls") {
      return this.wave.seekTo(seek.position);
    }
    if (this.selected){
      this.makeWaveInteractive();
      if (this.playing){
        this.wave.play();
      } else {
        this.wave.pause();
      }
    }
  }

  seek(pos){
    // only dispatch seek action if click originates from waveform (localSeek)
    if (this.localSeek) {
      this.localSeek = false;
      this.props.seek("waveform", pos);
    }
  }

  syncWave() {
    if (!this.props.currentlyPlaying || !this.wave) {
      return;
    }
    if (this.props.currentlyPlaying.id === this.props.song.id) {
      this.selected = true;
      // get the progress element so we can obtain it's value
      let progress = document.getElementById("progress-bar");
      if (progress) {
        // seek waveform to same percentage as progress element
        this.wave.seekTo(progress.value);
        this.makeWaveInteractive();
        this.selected = true;
      }
      // if (this.props.currentlyPlaying.playing) {
      //   this.wave.play();
      // }
    }
  }

  makeWaveInteractive() {
    if (!this.interactiveWave){
      this.wave.toggleInteraction();
      this.interactiveWave = true;
    }
  }

  render() {
    // console.log("selected: ", this.selected);
    // console.log("playing: ", this.playing);
    // if (this.props.currentlyPlaying) {
    //   // set flag specifying if current song is already active in player
    //   this.selected = this.props.song.id === this.props.currentlyPlaying.id;
    //   // flag to determine button appearance (play / pause)
    //   this.playing = this.props.currentlyPlaying.playing;
    // }
    return (
      <div
        id="song-show-wave"
        onClick={() => {
          if (!this.selected) {
            this.props.selectSong(this.props.song)
          } else {
            this.localSeek = true;
          }
        }}
      ></div>
    );
  }

  // first click:
  // if not selected, make interactive

  // subseq clicks:
  // set localSeek flag to true
}

export default WaveForm;
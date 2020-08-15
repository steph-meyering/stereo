import React from "react";
import { initWave } from "../../util/waveform_util";
import WaveFormContainer from "../waveform/waveform_container";

class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.waveData = {
      localSeek: false,
      selected: false,
      playing: false,
      interactive: false,
    }
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
      // .then(() => this.renderWave());
  }

  componentDidUpdate() {
    if (!this.props.currentlyPlaying) {
      return;
    }
    // seek waveform if incoming seek action originates from playControls
    // let seek = this.props.currentlyPlaying.seek;
    // if (seek && seek.origin === "playControls") {
    //   return this.state.wave.seekTo(seek.position);
    // }
  }

  makeWaveInteractive(){
    // if waveform is displayed but not active, first click will play and make interactive
    if (!this.interactiveWave) {
      this.state.wave.toggleInteraction();
      this.interactiveWave = true;
      this.selected = true;
    }
  }
  
  seek(pos) {
    // if song isn't currently selected, first click will select song and seek to beginning
    if (!this.selected){
      // this.selected = true;
      // this.localSeek = false;
      // this.props.selectSong(this.props.song);
      // this.state.wave.seekTo(0);
      // return
    }

    // only dispatch seek action if originating from waveform
    if (this.localSeek) {
      this.localSeek = false;
      this.props.seek("waveform", pos);
    }
  }

  renderWave() {
    let wave = initWave("#song-show-waveform");
    if (this.props.song.waveform) {
      wave.load(this.props.song.fileUrl, JSON.parse(this.props.song.waveform));
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
    // nothing to sync if song isn't selected
    if (!this.selected || !this.state.wave) {
      return;
    }
    // get the progress element so we can obtain it's value
    let progress = document.getElementById("progress-bar");
    if (progress) {
      // seek waveform to same percentage as progress element
      this.state.wave.seekTo(progress.value);
      this.makeWaveInteractive();
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
    // if (this.selected && this.state.wave) {
    //   // initialize waveform playback if song is playing
    //   if (this.playing) {
    //     this.state.wave.play();
    //   } else {
    //     this.state.wave.pause();
    //   }
    // }
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
                    // ... and make wave interactive
                    // this.makeWaveInteractive();
                  }
                }}
              ></div>
              <div className="name-artist">
                <h3 className="username">{this.props.song.artist}</h3>
                <h2 className="song-show-title">{this.props.song.title}</h2>
              </div>
            </div>
            {/* <div
              id="song-show-waveform"
              onClick={() => {
                if (!this.selected) {
                  // this.makeWaveInteractive();
                } else {
                  this.localSeek = true;
                }
              }}
            ></div> */}
            <WaveFormContainer
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
      </div>
    );
  }
}

export default SongShow;

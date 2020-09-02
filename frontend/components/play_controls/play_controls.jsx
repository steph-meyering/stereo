import React from "react";
import Slide from "react-reveal/Slide";
import VolumeControls from "./volume_controls";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.initProgress = this.initProgress.bind(this);
    this.seek = this.seek.bind(this);
    this.initialized = false;
  }

  componentDidUpdate() {
    this.playPauseButton = document.getElementById("play-pause");
    if (this.audio === undefined) {
      return;
    }
    if (this.props.currentlyPlaying.playing) {
      this.audio.play();
      this.playPauseButton.classList.remove("player-play");
      this.playPauseButton.classList.add("player-pause");
    } else {
      this.audio.pause();
      this.playPauseButton.classList.remove("player-pause");
      this.playPauseButton.classList.add("player-play");
    }
    let seek = this.props.currentlyPlaying.seek;
    if (seek && seek.origin === "waveform") {
      this.audio.currentTime = seek.position * this.audio.duration;
    }
  }

  initProgress() {
    if (!this.initialized) {
      // save pointers to elements that need updating
      this.initialized = true;
      this.audio = document.getElementById("audio-element");
      this.progress = document.getElementById("progress-bar");
      this.progress.addEventListener("click", this.seek);
      this.playerTimeElement = document.getElementById("current-time");
      this.songDurationElement = document.getElementById("song-duration");
      this.songDurationElement.innerHTML = this.convertTime(this.audio.duration)
    }
    let currentTime = this.audio.currentTime;
    let duration = this.audio.duration;
    let nextValue = currentTime / duration;
    this.playerTimeElement.innerHTML = this.convertTime(currentTime);
    if (!!nextValue) {
      // fixes bug where switching songs causes audio duration to briefly be 0
      this.progress.value = nextValue;
    }
  }

  convertTime(seconds){
    let currentSecond = Math.floor(seconds % 60);
    let currentMinute = Math.floor(seconds / 60);
    currentSecond = currentSecond < 10 ? "0" + currentSecond : currentSecond
    currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
    return `${currentMinute}:${currentSecond}`;
  }
  
  seek(e) {
    let percent = e.offsetX / this.progress.offsetWidth;
    this.audio.currentTime = percent * this.audio.duration;
    this.props.seek("playControls", percent);
  }

  playWave() {
    this.waveform.play();
  }

  render() {
    if (this.props.currentlyPlaying === null) {
      return null;
    } else {
      return (
        <Slide bottom>
          <span id="play-controls">
            <audio
              id="audio-element"
              onTimeUpdate={this.initProgress}
              autoPlay
              src={this.props.currentlyPlaying.fileUrl}
            ></audio>
            <div id="player">
              <div className="player-previous player-button"></div>
              <div
                id="play-pause"
                className="player-pause player-button"
                onClick={() => this.props.playPauseSong()}
              ></div>
              <div className="player-next player-button"></div>
              <div className="player-shuffle player-button"></div>
              <div className="player-repeat player-button"></div>
              <div id="timeline">
                <div id="current-time">--:--</div>
                <progress value="0" max="1" id="progress-bar"></progress>
                <div id="song-duration">--:--</div>
              </div>
              <div
                id="volume-button"
                className="player-volume-high player-button"
              >
                <VolumeControls/>
              </div>
            </div>
            <div className="currently-playing-song-data">
              <div>
                <img
                  src={this.props.currentlyPlaying.photoUrl}
                  alt={this.props.currentlyPlaying.title}
                />
              </div>
              <div>
                <p className="uploader">{this.props.currentlyPlaying.artist}</p>
                <p className="song-title">
                  {this.props.currentlyPlaying.title}
                </p>
              </div>
            </div>
          </span>
        </Slide>
      );
    }
  }
}

export default PlayControls;

import React from "react";
import Slide from "react-reveal/Slide";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.initProgress = this.initProgress.bind(this);
    this.seek = this.seek.bind(this);
  }

  componentDidUpdate(){
    this.playPauseButton = document.getElementById("play-pause");
    if (this.audio !== undefined) {
      if (this.props.currentSong.playing){
        this.audio.play();
        this.playPauseButton.className = "player-pause";
      } else {
        this.audio.pause();
        this.playPauseButton.className = "player-play";
      }
    }
    let seek = this.props.currentSong.seek
    if (seek && seek.origin === "waveform"){
      this.audio.currentTime = seek.position * this.audio.duration;
    }
  }
  
  initProgress() {
    this.audio = document.getElementById("audio-element");
    this.progress = document.getElementById("progress-bar");
    this.progress.addEventListener("click", this.seek);
    let nextValue = (this.audio.currentTime / this.audio.duration);
    if (!!nextValue){ // fixes bug where switching songs causes audio duration to briefly be 0
      this.progress.value = nextValue;
    }
    // this.waveform = document.getElementById("song-show-waveform").firstChild;
  }

  // playPause() {
    // if (this.audio.paused){
    //   this.audio.play();
    //   this.playPauseButton.className = "player-pause";
    // } else {
    //   this.audio.pause();
    //   this.playPauseButton.className = "player-play";
    // }
    // this.props.playPauseSong();
  // }

  seek(e) {
    let percent = e.offsetX / this.progress.offsetWidth;
    this.audio.currentTime = percent * this.audio.duration;
    this.props.seek("playControls", percent);
  }

  playWave() {
    this.waveform.play()
  }

  render() {
    if (this.props.currentSong === null) {
      return null;
    } else {
      return (
        <Slide bottom>
          <span id="play-controls">
            <audio
              id="audio-element"
              onTimeUpdate={this.initProgress}
              autoPlay
              src={this.props.currentSong.fileUrl}
            ></audio>
            <div id="player">
              <div
                id="play-pause"
                className="player-pause"
                onClick={() => this.props.playPauseSong()}
              ></div>
              <progress value="0" max="1" id="progress-bar"></progress>
              <div id="play-volume" className="player-volume-high"></div>
            </div>
            <div className="currently-playing-song-data">
              <div>
                <img
                  src={this.props.currentSong.photoUrl}
                  alt={this.props.currentSong.title}
                />
              </div>
              <div>
                <p className="uploader">{this.props.currentSong.artist}</p>
                <p className="song-title">{this.props.currentSong.title}</p>
              </div>
            </div>
          </span>
        </Slide>
      );
    }
  }
}

export default PlayControls;

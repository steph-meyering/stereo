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
    if (this.audio === undefined) {
      return
    }
    if (this.props.currentlyPlaying.playing){
      this.audio.play();
      this.playPauseButton.className = "player-pause";
    } else {
      this.audio.pause();
      this.playPauseButton.className = "player-play";
    }
    let seek = this.props.currentlyPlaying.seek
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
  }


  seek(e) {
    let percent = e.offsetX / this.progress.offsetWidth;
    this.audio.currentTime = percent * this.audio.duration;
    this.props.seek("playControls", percent);
  }

  playWave() {
    this.waveform.play()
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
                  src={this.props.currentlyPlaying.photoUrl}
                  alt={this.props.currentlyPlaying.title}
                />
              </div>
              <div>
                <p className="uploader">{this.props.currentlyPlaying.artist}</p>
                <p className="song-title">{this.props.currentlyPlaying.title}</p>
              </div>
            </div>
          </span>
        </Slide>
      );
    }
  }
}

export default PlayControls;

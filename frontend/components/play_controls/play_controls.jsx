import React from "react";
import Slide from "react-reveal/Slide";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
    this.initProgress = this.initProgress.bind(this)
  }

  componentDidUpdate(){
    this.playPauseButton = document.getElementById("play-pause");
  }
  
  initProgress() {
    this.audio = document.getElementById("audio-element");
    this.progress = document.getElementById("progress-bar");
    this.progress.addEventListener("click", this.seek)
    this.progress.value = (this.audio.currentTime / this.audio.duration);
    // this.waveform = document.getElementById("song-show-waveform").firstChild;
  }

  playPause() {
    if (this.audio.paused){
      this.audio.play();
      this.playPauseButton.className = "player-pause";
    } else {
      this.audio.pause();
      this.playPauseButton.className = "player-play";

    }
    
  }

  seek(e) {
    let percent = e.offsetX // TODO
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
              <button
                id="play-pause"
                className="player-pause"
                onClick={() => this.playPause()}
              >
              </button>
              <progress value="0" max="1" id="progress-bar"></progress>
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

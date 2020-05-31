import React from "react";
import Slide from "react-reveal/Slide";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  componentDidUpdate() {
    this.audio = document.getElementById("audio-element");
    // this.waveform = document.getElementById("song-show-waveform").firstChild;
  }

  play() {
    this.audio.play();
  }

  playWave() {
    debugger
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
              controls
              autoPlay
              src={this.props.currentSong.fileUrl}
            ></audio>
            <div>
              <div
                // class="play-button"
                id="play-pause"
                onClick={() => this.play()}
              >
                PLAY
              </div>
              <div
                // class="play-button"
                id="play-pause"
                onClick={() => this.playWave()}
              >
                PLAY WAVE
              </div>
              <progress></progress>
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

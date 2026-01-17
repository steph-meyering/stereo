import React from "react";
import Slide from "react-reveal/Slide";
import VolumeControls from "./volume_controls";

class PlayControls extends React.Component {
  constructor(props) {
    super(props);
    this.initProgress = this.initProgress.bind(this);
    this.seek = this.seek.bind(this);
    this.handleScrubHover = this.handleScrubHover.bind(this);
    this.clearScrubHover = this.clearScrubHover.bind(this);
    this.initialized = false;
    this.seekId = null;
    this.state = {
      // allows cycling through the different repeat icon css classes
      repeating: [
        "player-repeat-off",
        "player-repeat-one",
        "player-repeat-all",
      ],
      shuffle: false,
      showQueue: false,
      scrubTime: null,
      scrubLeft: 0,
    };
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
    if (seek && seek.origin === "waveform" && this.seekId !== seek.id) {
      // seek id prevents old seek data from triggering again
      this.seekId = seek.id;
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
    }
    this.songDurationElement.innerHTML = this.convertTime(this.audio.duration);
    let currentTime = this.audio.currentTime;
    let duration = this.audio.duration;
    let nextValue = currentTime / duration;
    this.playerTimeElement.innerHTML = this.convertTime(currentTime);
    if (nextValue === 1) {
      if (this.state.repeating[0] === "player-repeat-one"){
        this.playFromStart();
      } else {
        this.playNext();
      }
    }
    if (!!nextValue) {
      // fixes bug where switching songs causes audio duration to briefly be 0
      this.progress.value = nextValue;
    }
  }

  convertTime(seconds) {
    let currentSecond = Math.floor(seconds % 60);
    let currentMinute = Math.floor(seconds / 60);
    if (Number.isNaN(currentMinute) || Number.isNaN(currentSecond)) {
      return "--:--";
    }
    currentSecond = currentSecond < 10 ? "0" + currentSecond : currentSecond;
    currentMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;
    return `${currentMinute}:${currentSecond}`;
  }

  seek(e) {
    let percent = e.offsetX / this.progress.offsetWidth;
    this.audio.currentTime = percent * this.audio.duration;
    this.props.seek("playControls", percent);
  }

  handleScrubHover(e) {
    if (!this.audio || !this.progress) return;
    const rect = this.progress.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.min(Math.max(offsetX / rect.width, 0), 1);
    const scrubTime = this.convertTime(percent * this.audio.duration);
    this.setState({ scrubTime, scrubLeft: offsetX });
  }

  clearScrubHover() {
    this.setState({ scrubTime: null });
  }

  playNext() {
    // update queue and play next song
    if (this.props.queue.length > 1) {
      let nextSong = this.props.queue[1];
      this.props.playNext();
      this.props.selectSong(nextSong);
      this.initialized = false;
    }
  }

  playFromStart(){
    this.audio.currentTime = 0;
    this.props.seek("playControls", 0);
    this.progress.value = 0;
  }
  
  playPrevious() {
    // if song has played for more than 2 seconds, play from beginning
    if (this.audio.currentTime > 2) {
      this.playFromStart();

      // if at least one song has been played before, update queue and play it
    } else if (this.props.played) {
      let previousSong = this.props.played[this.props.played.length - 1];
      if (previousSong) {
        this.props.playPrevious();
        this.props.selectSong(previousSong);
      }
    }
  }

  toggleRepeat() {
    this.setState({
      repeating: [].concat(
        this.state.repeating.slice(1),
        this.state.repeating[0]
      ),
    });
  }

  toggleShuffle(){
    this.setState({
      shuffle: !this.state.shuffle
    })
    this.props.toggleShuffle();
  }

  toggleQueue(){
    this.setState({ showQueue: !this.state.showQueue });
  }

  render() {
    if (this.props.currentlyPlaying === null) {
      return null;
    } else {
      const upNext = this.props.queue && this.props.queue.length > 1
        ? this.props.queue.slice(1)
        : [];
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
                className="player-previous player-button"
                onClick={() => this.playPrevious()}
                role="button"
                tabIndex="0"
                aria-label="Play previous"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.playPrevious();
                  }
                }}
              ></div>
              <div
                id="play-pause"
                className="player-pause player-button"
                onClick={() => this.props.playPauseSong()}
                role="button"
                tabIndex="0"
                aria-label="Play or pause"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.props.playPauseSong();
                  }
                }}
              ></div>
              <div
                className="player-next player-button"
                onClick={() => this.playNext()}
                role="button"
                tabIndex="0"
                aria-label="Play next"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.playNext();
                  }
                }}
              ></div>
              <div
                className={`${
                  this.state.shuffle ? "player-shuffle-on" : "player-shuffle-off"
                } player-button`}
                onClick={() => this.toggleShuffle()}
                role="button"
                tabIndex="0"
                aria-label="Toggle shuffle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.toggleShuffle();
                  }
                }}
              ></div>
              <div
                className={`${this.state.repeating[0]} player-button`}
                onClick={() => this.toggleRepeat()}
                role="button"
                tabIndex="0"
                aria-label="Toggle repeat"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.toggleRepeat();
                  }
                }}
              ></div>
              <div
                className="player-queue player-button"
                onClick={() => this.toggleQueue()}
                role="button"
                tabIndex="0"
                aria-label="Toggle queue"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.toggleQueue();
                  }
                }}
              ></div>
              <div id="timeline">
                <div id="current-time">--:--</div>
                <div
                  id="progress-wrapper"
                  onMouseMove={this.handleScrubHover}
                  onMouseLeave={this.clearScrubHover}
                >
                  <progress value="0" max="1" id="progress-bar"></progress>
                  {this.state.scrubTime && (
                    <div
                      className="scrub-tooltip"
                      style={{ left: this.state.scrubLeft }}
                    >
                      {this.state.scrubTime}
                    </div>
                  )}
                </div>
                <div id="song-duration">--:--</div>
              </div>
              <VolumeControls />
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
            {this.state.showQueue && (
              <div id="queue-panel">
                <div className="queue-header">
                  <div>Up Next</div>
                  <button className="queue-clear" onClick={() => this.props.clearQueue()}>
                    Clear
                  </button>
                </div>
                {upNext.length === 0 ? (
                  <div className="queue-empty">Queue is empty</div>
                ) : (
                  <ul className="queue-list">
                    {upNext.map((song) => (
                      <li className="queue-item" key={song.id}>
                        <div className="queue-item-info">
                          <div className="queue-item-title">{song.title}</div>
                          <div className="queue-item-artist">{song.artist}</div>
                        </div>
                        <button
                          className="queue-remove"
                          onClick={() => this.props.removeFromQueue(song.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </span>
        </Slide>
      );
    }
  }
}

export default PlayControls;

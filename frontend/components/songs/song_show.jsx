import React from "react";
import WaveSurfer from "wavesurfer.js";

class SongShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.responsiveWave = this.responsiveWave.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchSong(this.props.match.params.songId)
      .then(() => this.renderWave());
  }

  componentDidUpdate() {

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
      wave.setMute(true)
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

  render() {
    if (this.props.song === undefined) return null;
    let selected = false;
    let playing = false;
    if (this.props.currentlyPlaying) {
      // set flag specifying if current song is already active in player
      selected = this.props.song.id === this.props.currentlyPlaying.id;
      // flag to determine if button appearance
      playing = this.props.currentlyPlaying.playing
    }
    return (
      <div className="song-show-page">
        <div className="song-show-top">
          <div className="song-show-left">
            <div className="name-artist-play">
              <div
                className={playing ? "pause-button" : "play-button"}
                onClick={() => {
                  // if song has already been selected, button will play/pause instead
                  if (selected) {
                    this.props.playPauseSong();
                  } else {
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
        <button
          onClick={() => {
            this.state.wave.playPause();
            this.props.selectSong(this.props.song);
          }}
        >
          play/pause
        </button>
      </div>
    );
  }
}

export default SongShow;

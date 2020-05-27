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
    console.log("resize event");
    this.state.wave.drawBuffer();
  }

  render() {
    if (this.props.song === undefined) return null;
    return (
      <div className="song-show-page">
        <div className="song-show-top">
          <div className="song-show-left">
            <div className="name-artist-play">
              <div
                className="play-button"
                onClick={() => this.props.selectSong(this.props.song)}
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
          onClick={this.state.wave ? () => this.state.wave.playPause() : null}
        >
          play/pause
        </button>
        <button
          onClick={this.state.wave ? () => this.state.wave.setSinkId("playa") : null}
        >
          set sink id
        </button>
      </div>
    );
  }
}

export default SongShow;

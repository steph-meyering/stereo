import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";


class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: this.props.song.id,
    };
    this.responsiveWave = this.responsiveWave.bind(this); 
  }
  
  componentDidMount() {
    console.log("component did mount")
    this.renderWave();
  }

  responsiveWave(){
    console.log('resize event')
    this.state.wave.drawBuffer();
  } 

  renderWave() {
    let wave = WaveSurfer.create({
      container: `#wave-${this.state.songId}`,
      height: 100,
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
      fillParent: true,
      minPxPerSec: 10,
    });
  
    
    if (this.props.song.waveform) {
      wave.load("#", JSON.parse(this.props.song.waveform));
      console.log("use saved waveform data");
      this.setState({wave})
      // 
      window.addEventListener("resize", wave.util.debounce(this.responsiveWave), 2000);
    } else {
      return null;
      // wave.load(this.state.fileUrl);
      // wave.on("ready", () =>
      //   wave
      //     .exportPCM(1024, 10000, true)
      //     .then((res) => this.setState({ waveData: res }))
      // );
      // console.log("load song and calc waveform data");
    }
  }

  edit() {
    this.props.openModal("edit-song");
    window.localStorage.setItem("editTarget", this.props.song.id);
  }

  render() {
    console.log(this.state)
    // causes an error without this if statement
    if (this.props.song === undefined) return null;

    let editButton = this.props.ownSong ? (
      <button onClick={() => this.edit()}>edit</button>
    ) : null;

    return (
      <div className="song-index-item">
        <Link to={`/songs/${this.state.songId}`}>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </Link>
        <div className="info-and-wave">
          <div className="song-index-info">
            <div
              className="play-button"
              onClick={() => this.props.selectSong(this.props.song)}
            ></div>
            <div>
              <Link to={`/users/${this.props.song.artistId}`}>
                {this.props.song.artist}
              </Link>
              <h3>{this.props.song.title}</h3>
            </div>
          </div>
          <div id={`wave-${this.props.song.id}`} className="waveform"></div>
          {editButton}
        </div>
      </div>
    );
  }
}

export default SongIndexItem;

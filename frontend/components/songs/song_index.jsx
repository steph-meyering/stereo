import React from "react";
import SongIndexItem from "./song_index_item";
import SongSplashItem from "./song_splash_item";
import WaveSurfer from "wavesurfer.js";
import { defaultWaveParams } from "../../util/waveform_util";

class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    this.songItems = null;
    this.withWaveForm = this.withWaveForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchSongs();
  }

  withWaveForm() {
    let component =
      this.props.match.path === "/" ? SongSplashItem : SongIndexItem;
    return component;
  }

  // Generate waveform data for each song, then save to database
  generateAllWaveforms(songs) {
    songs.forEach(song => {
      let formData = new FormData();
      let wave = WaveSurfer.create(defaultWaveParams)
      wave.load(song.props.song.fileUrl)
      wave.on("ready", () =>
        wave
          .exportPCM(1024, 10000, true)
          .then((res) => formData.append("song[waveform]", res))
          .then(() =>
            this.props.updateSong({ id: song.props.song.id, song: formData })
          )
      );
    })
  }
  
  isSplash() {
    let className =
      this.props.match.path === "/" ? "splash-index" : "song-index";
    return className;
  }

  addFiller() {
    if (this.props.match.path === "/") {
      return <li className="splash-filler-item"></li>;
    }
  }

  render() {
    if (this.props.songs.length === 0) return null;

    let currentSong = null;
    if (this.props.currentSong) {
      currentSong = this.props.currentSong.id;
    }
    
    let SongComponent = this.withWaveForm();

    let songItems = this.props.songs.map((song) => (
      <SongComponent
        song={song}
        selectSong={this.props.selectSong}
        key={song.id}
        isSelected={song.id === currentSong}
        // boolean to represent if current user is song uploader to allow editing
        ownSong={this.props.currentUser === song.artistId}
        openModal={this.props.openModal}
      />
    ));
    return (
      <div className={this.isSplash().concat("-main")}>
        <ul className={this.isSplash()}>
          {songItems}
          {this.addFiller()}
          {this.addFiller()}
          {this.addFiller()}
          {this.addFiller()}
        </ul>
        <button onClick={() => this.generateAllWaveforms(songItems)}>
          Calc all waves 🛠
        </button>
        <div id="waveform-container"></div>
      </div>
    );
  }
}

export default SongIndex;

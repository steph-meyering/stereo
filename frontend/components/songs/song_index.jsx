import React from "react";
import SongIndexItem from "./song_index_item";
import SongSplashItem from "./song_splash_item";
import WaveSurfer from "wavesurfer.js";

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
    let isPlaying = false;
    if (this.props.currentlyPlaying) {
      currentSong = this.props.currentlyPlaying.id;
      isPlaying = this.props.currentlyPlaying.playing;
    }
    
    let SongComponent = this.withWaveForm();
    let songItems = this.props.songs.map((song) => (
      <SongComponent
        song={song}
        selectSong={this.props.selectSong}
        playPauseSong={this.props.playPauseSong}
        seek={this.props.seek}
        key={song.id}
        isSelected={song.id === currentSong}
        isPlaying={isPlaying}
        currentlyPlaying={this.props.currentlyPlaying}
        // boolean to represent if current user is song uploader to allow editing
        ownSong={this.props.isAdmin || this.props.currentUser === song.artistId}
        openModal={this.props.openModal}
        addToQueue={this.props.addToQueue}
        currentUser={this.props.currentUser}
        likeSong={this.props.likeSong}
        unlikeSong={this.props.unlikeSong}
        repostSong={this.props.repostSong}
        unrepostSong={this.props.unrepostSong}
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
        {/* <button onClick={() => this.generateAllWaveforms(songItems)}>
          Calc all waves 🛠
        </button> */}
        <div id="waveform-container"></div>
      </div>
    );
  }
}

export default SongIndex;

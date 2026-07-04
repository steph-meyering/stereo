import React from "react";
import NowPlayingFullContainer from "./now_playing_full_container";

class MiniPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNowPlaying: false };
  }

  openNowPlaying = () => {
    this.setState({ showNowPlaying: true });
  };

  closeNowPlaying = () => {
    this.setState({ showNowPlaying: false });
  };

  render() {
    const { currentSong, playing, playPauseSong } = this.props;
    const { showNowPlaying } = this.state;

    if (!currentSong) return null;

    return (
      <>
        <div className="mini-player" onClick={this.openNowPlaying}>
        {/* Progress bar at top */}
        <div className="mini-player-progress">
          <div
            className="progress-fill"
            style={{ width: `${currentSong.progress || 0}%` }}
          />
        </div>

        {/* Main content */}
        <div className="mini-player-content">
          <img
            src={currentSong.photoUrl}
            alt={currentSong.title}
            className="mini-player-artwork"
          />
          
          <div className="mini-player-info">
            <div className="mini-player-title">{currentSong.title}</div>
            <div className="mini-player-artist">{currentSong.artist}</div>
          </div>

          <button
            className="mini-player-play-button"
            onClick={(e) => {
              e.stopPropagation();
              playPauseSong();
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
        </div>
        {showNowPlaying && (
          <NowPlayingFullContainer onClose={this.closeNowPlaying} />
        )}
      </>
    );
  }
}

export default MiniPlayer;

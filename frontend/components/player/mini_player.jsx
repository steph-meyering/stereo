import React from "react";
import { Link } from "react-router-dom";

class MiniPlayer extends React.Component {
  render() {
    const { currentSong, playing, playPauseSong } = this.props;

    if (!currentSong) return null;

    return (
      <div className="mini-player">
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
            onClick={playPauseSong}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
    );
  }
}

export default MiniPlayer;

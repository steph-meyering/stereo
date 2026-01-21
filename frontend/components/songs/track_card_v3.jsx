import React from "react";
import { Link } from "react-router-dom";

class TrackCardV3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverflow: false,
    };
  }

  handlePlayClick = () => {
    const { song, currentlyPlaying, selectSong, playPauseSong } = this.props;
    const isSelected = currentlyPlaying && currentlyPlaying.id === song.id;

    if (isSelected) {
      playPauseSong();
    } else {
      selectSong(song);
    }
  };

  handleOverflowClick = () => {
    this.setState({ showOverflow: !this.state.showOverflow });
  };

  render() {
    const { song, currentUser, addToQueue, likeSong, unlikeSong, repostSong, unrepostSong, currentlyPlaying } = this.props;
    const { showOverflow } = this.state;

    const isPlaying = currentlyPlaying && currentlyPlaying.id === song.id && currentlyPlaying.playing;
    const liked = song.liked;
    const reposted = song.reposted;
    const likeCount = song.likeCount || 0;
    const repostCount = song.repostCount || 0;

    return (
      <div className="track-card-v3">
        {/* Top section: Album art + Title/Artist */}
        <div className="track-card-header">
          <div className="track-card-artwork-wrapper">
            <img
              src={song.photoUrl}
              alt={song.title}
              className="track-card-artwork"
            />
            <button
              className={`track-card-play-overlay ${isPlaying ? 'playing' : ''}`}
              onClick={this.handlePlayClick}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
          <div className="track-card-info">
            <Link to={`/songs/${song.id}`} className="track-card-title">
              {song.title}
            </Link>
            <Link to={`/users/${song.artistId}`} className="track-card-artist">
              {song.artist}
            </Link>
          </div>
        </div>

        {/* Waveform section (placeholder for now) */}
        <div className="track-card-waveform">
          <div className="waveform-bars">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="waveform-bar"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  backgroundColor: i < 20 ? 'var(--waveform-played)' : 'var(--waveform-unplayed)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Engagement row */}
        <div className="track-card-actions">
          <button
            className={`action-button like ${liked ? 'active' : ''}`}
            onClick={() => liked ? unlikeSong(song.id) : likeSong(song.id)}
            disabled={!currentUser}
          >
            ♥ <span className="count">{likeCount}</span>
          </button>
          <button
            className={`action-button repost ${reposted ? 'active' : ''}`}
            onClick={() => reposted ? unrepostSong(song.id) : repostSong(song.id)}
            disabled={!currentUser}
          >
            ↻ <span className="count">{repostCount}</span>
          </button>
          <div className="track-card-overflow">
            <button
              className="action-button overflow-trigger"
              onClick={this.handleOverflowClick}
            >
              •••
            </button>
            {showOverflow && (
              <div className="overflow-menu">
                <button onClick={() => {
                  addToQueue(song);
                  this.setState({ showOverflow: false });
                }}>
                  Add to queue
                </button>
                <Link to={`/songs/${song.id}`}>
                  Go to track
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TrackCardV3;

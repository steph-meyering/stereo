import React from "react";
import { Link } from "react-router-dom";
import WaveformSeek from "../waveform/waveform_seek";

class TrackCardV3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverflow: false,
      progress: 0,
    };
    this.progressInterval = null;
  }

  componentDidMount() {
    // Update progress periodically
    this.progressInterval = setInterval(() => {
      const { song, currentlyPlaying } = this.props;
      const isSelected = currentlyPlaying && currentlyPlaying.id === song.id;
      
      if (isSelected) {
        const audio = document.getElementById("audio-element");
        if (audio && audio.duration) {
          const progress = audio.currentTime / audio.duration;
          if (this.state.progress !== progress) {
            this.setState({ progress });
          }
        }
      } else if (this.state.progress !== 0) {
        this.setState({ progress: 0 });
      }
    }, 100);
  }

  componentWillUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
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

  handleWaveformSeek = (percentage) => {
    const { song, currentlyPlaying, selectSong, seek } = this.props;
    const isSelected = currentlyPlaying && currentlyPlaying.id === song.id;

    // If this song isn't playing, start it first
    if (!isSelected) {
      selectSong(song);
      // Give it a moment to load, then seek
      setTimeout(() => {
        seek("waveform", percentage);
      }, 100);
    } else {
      seek("waveform", percentage);
    }
  };

  getWaveformProgress = () => {
    return this.state.progress;
  };

  render() {
    const { song, currentUser, addToQueue, likeSong, unlikeSong, repostSong, unrepostSong, currentlyPlaying } = this.props;
    const { showOverflow } = this.state;

    const isPlaying = currentlyPlaying && currentlyPlaying.id === song.id && currentlyPlaying.playing;
    const isSelected = currentlyPlaying && currentlyPlaying.id === song.id;
    const liked = song.liked;
    const reposted = song.reposted;
    const likeCount = song.likeCount || 0;
    const repostCount = song.repostCount || 0;

    // Parse waveform data
    let waveformData = null;
    if (song.waveform && song.waveform !== "[]") {
      try {
        waveformData = JSON.parse(song.waveform);
      } catch (e) {
        // Invalid JSON, use null
      }
    }

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

        {/* Interactive Waveform */}
        <div className="track-card-waveform">
          <WaveformSeek
            waveformData={waveformData}
            progress={this.getWaveformProgress()}
            height={40}
            onSeek={this.handleWaveformSeek}
          />
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

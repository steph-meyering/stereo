import React from "react";
import WaveformSeek from "../waveform/waveform_seek";
import CommentForm from "../comments/comment_form";
import CommentIndexContainer from "../comments/comment_index_container";

class NowPlayingFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      currentTime: 0,
      duration: 0,
      activeTab: "upNext",
    };
    this.progressInterval = null;
  }

  componentDidMount() {
    this.startProgressSync();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSong?.id !== this.props.currentSong?.id) {
      this.setState({ progress: 0, currentTime: 0, duration: 0 });
    }
  }

  componentWillUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  startProgressSync() {
    this.progressInterval = setInterval(() => {
      const audio = document.getElementById("audio-element");
      if (!audio || !audio.duration) return;

      const progress = audio.currentTime / audio.duration;
      const currentTime = audio.currentTime;
      const duration = audio.duration;

      const progressChanged = Math.abs(progress - this.state.progress) > 0.002;
      const timeChanged = Math.abs(currentTime - this.state.currentTime) > 0.25;

      if (progressChanged || timeChanged) {
        this.setState({ progress, currentTime, duration });
      }
    }, 200);
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

  handleWaveformSeek = (percentage) => {
    this.props.seek("waveform", percentage);
  };

  handleNext = () => {
    const { queue, selectSong, playNext } = this.props;
    if (queue && queue.length > 1) {
      const nextSong = queue[1];
      playNext();
      selectSong(nextSong);
    }
  };

  handlePrevious = () => {
    const audio = document.getElementById("audio-element");
    if (audio && audio.currentTime > 2) {
      audio.currentTime = 0;
      this.props.seek("playControls", 0);
      return;
    }

    const { played, playPrevious, selectSong } = this.props;
    if (played && played.length > 0) {
      const previousSong = played[played.length - 1];
      playPrevious();
      selectSong(previousSong);
    }
  };

  handleQueueItemClick = (song) => {
    const { queue, setQueue, selectSong } = this.props;
    selectSong(song);

    if (setQueue && queue && queue.length > 0) {
      const startIndex = queue.findIndex((queued) => queued.id === song.id);
      if (startIndex >= 0) {
        setQueue(queue.slice(startIndex));
      }
    }
  };

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  parseWaveformData(songData) {
    if (!songData || !songData.waveform || songData.waveform === "[]") return null;
    try {
      return JSON.parse(songData.waveform);
    } catch (e) {
      return null;
    }
  }

  renderUpNext() {
    const { queue, removeFromQueueIndex, clearQueue } = this.props;
    const upNext = queue && queue.length > 1 ? queue.slice(1) : [];

    return (
      <div className="now-playing-upnext">
        <div className="upnext-header">
          <div>Up Next</div>
          <button className="upnext-clear" onClick={clearQueue}>
            Clear
          </button>
        </div>
        {upNext.length === 0 ? (
          <div className="upnext-empty">Queue is empty</div>
        ) : (
          <ul className="upnext-list">
            {upNext.map((song, index) => {
              const queueIndex = index + 1;
              return (
                <li className="upnext-item" key={`${song.id}-${index}`}>
                <button
                  className="upnext-info"
                  onClick={() => this.handleQueueItemClick(song)}
                >
                  <img src={song.photoUrl} alt={song.title} />
                  <div>
                    <div className="upnext-title">{song.title}</div>
                    <div className="upnext-artist">{song.artist}</div>
                  </div>
                </button>
                <button
                  className="upnext-remove"
                  onClick={() => removeFromQueueIndex(queueIndex)}
                  aria-label="Remove from queue"
                >
                  ×
                </button>
              </li>
            );
            })}
          </ul>
        )}
      </div>
    );
  }

  render() {
    const { currentSong, currentSongData, playing, onClose } = this.props;
    const { progress, currentTime, duration, activeTab } = this.state;

    if (!currentSong) return null;

    const waveformData = this.parseWaveformData(currentSongData);

    return (
      <div className="now-playing-full">
        <div className="now-playing-header">
          <button className="now-playing-back" onClick={onClose} aria-label="Back">
            ←
          </button>
          <div className="now-playing-header-title">Now Playing</div>
          <button className="now-playing-overflow" aria-label="More options">
            •••
          </button>
        </div>

        <div className="now-playing-body">
          <div className="now-playing-artwork">
            <img src={currentSong.photoUrl} alt={currentSong.title} />
          </div>

          <div className="now-playing-meta">
            <div className="now-playing-title">{currentSong.title}</div>
            <div className="now-playing-artist">{currentSong.artist}</div>
          </div>

          <div className="now-playing-waveform">
            <WaveformSeek
              waveformData={waveformData}
              progress={progress}
              height={60}
              onSeek={this.handleWaveformSeek}
            />
          </div>

          <div className="now-playing-time">
            <span>{this.convertTime(currentTime)}</span>
            <span>{this.convertTime(duration)}</span>
          </div>

          <div className="now-playing-controls">
            <button
              className="now-playing-control"
              onClick={this.handlePrevious}
              aria-label="Previous track"
            >
              ⏮
            </button>
            <button
              className="now-playing-control play-pause"
              onClick={this.props.playPauseSong}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <span className="pause-icon">
                  <span></span>
                  <span></span>
                </span>
              ) : (
                <span className="play-icon">▶</span>
              )}
            </button>
            <button
              className="now-playing-control"
              onClick={this.handleNext}
              aria-label="Next track"
            >
              ⏭
            </button>
          </div>
        </div>

        <div className="now-playing-tabs">
          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => this.setActiveTab("comments")}
          >
            Comments
          </button>
          <button
            className={activeTab === "upNext" ? "active" : ""}
            onClick={() => this.setActiveTab("upNext")}
          >
            Up Next
          </button>
        </div>

        <div className="now-playing-tab-content">
          {activeTab === "comments" && (
            <div className="now-playing-comments">
              <CommentForm songId={currentSong.id} />
              <CommentIndexContainer songId={currentSong.id} />
            </div>
          )}
          {activeTab === "upNext" && this.renderUpNext()}
        </div>
      </div>
    );
  }
}

export default NowPlayingFull;

import React from "react";
import { Link } from "react-router-dom";

class SongSplashItem extends React.Component {
  
  render() {
    let selected = this.props.isSelected;
    let playing = this.props.isPlaying;
    let liked = this.props.song.liked;
    let likeCount = this.props.song.likeCount || 0;
    return (
      <div className="song-splash-item">
        <Link to={`/songs/${this.props.song.id}`}>
          <img
            className="album-cover"
            src={this.props.song.photoUrl}
            alt={this.props.song.title}
          />
        </Link>
        <div
          className={selected && playing ? "pause-button" : "play-button"}
          onClick={() => {
            if (selected){
              this.props.playPauseSong();
            } else {
              this.props.selectSong(this.props.song);
            }
          } 
        }
        ></div>
        <div className="splash-song-info">
          <Link to={`/songs/${this.props.song.id}`}>
            <h3>{this.props.song.title}</h3>
          </Link>
          <Link to={`/users/${this.props.song.artistId}`}>
            <h3>{this.props.song.artist}</h3>
          </Link>
          <button
            className="queue-add-button"
            onClick={() => this.props.addToQueue(this.props.song)}
          >
            Add to Queue
          </button>
          <button
            className={liked ? "like-button liked" : "like-button"}
            disabled={!this.props.currentUser}
            onClick={() =>
              liked
                ? this.props.unlikeSong(this.props.song.id)
                : this.props.likeSong(this.props.song.id)
            }
          >
            {liked ? "Liked" : "Like"} · {likeCount}
          </button>
        </div>
      </div>
    );
  }
}

export default SongSplashItem;

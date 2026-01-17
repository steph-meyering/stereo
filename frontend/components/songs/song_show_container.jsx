import { connect } from "react-redux";
import { fetchSong, likeSong, unlikeSong } from "../../actions/song_actions";
import SongShow from "./song_show";
import {
  selectSong,
  playPauseSong,
  seek,
} from "../../actions/current_song_actions";

const mSTP = (state, ownProps) => {
  if (ownProps.match === "undefined") {
    return { song: undefined };
  }
  return {
    song: state.entities.songs[ownProps.match.params.songId],
    currentlyPlaying: state.playControls.currentSong,
    currentUser: state.session.id,
  };
};

const mDTP = (dispatch) => ({
  fetchSong: (songId) => dispatch(fetchSong(songId)),
  selectSong: (song) => dispatch(selectSong(song)),
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
  likeSong: (songId) => dispatch(likeSong(songId)),
  unlikeSong: (songId) => dispatch(unlikeSong(songId)),
});

export default connect(mSTP, mDTP)(SongShow);

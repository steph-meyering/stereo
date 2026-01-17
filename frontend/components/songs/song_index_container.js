import { fetchSongs, likeSong, unlikeSong } from "../../actions/song_actions";
import { updateSong } from "../../actions/song_actions";
import { connect } from "react-redux";
import SongIndex from "./song_index";
import { withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import { selectSong, playPauseSong, seek } from "../../actions/current_song_actions";
import { addToQueue } from "../../actions/queue_actions";


const mSTP = state => {
    return {
      songs: Object.values(state.entities.songs),
      currentUser: state.session.id,
      isAdmin: state.session.admin,
      currentlyPlaying: state.playControls.currentSong,
    };
}

const mDTP = (dispatch) => ({
  fetchSongs: () => dispatch(fetchSongs()),
  selectSong: (song) => dispatch(selectSong(song)),
  openModal: (modal) => dispatch(openModal(modal)),
  updateSong: (id, song) => dispatch(updateSong(id, song)),
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
  addToQueue: (song) => dispatch(addToQueue(song)),
  likeSong: (songId) => dispatch(likeSong(songId)),
  unlikeSong: (songId) => dispatch(unlikeSong(songId)),
});

export default withRouter(connect(mSTP, mDTP)(SongIndex));
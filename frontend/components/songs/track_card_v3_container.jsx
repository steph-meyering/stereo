import { connect } from "react-redux";
import TrackCardV3 from "./track_card_v3";
import { selectSong, playPauseSong } from "../../actions/current_song_actions";
import { addToQueue } from "../../actions/queue_actions";
import { likeSong, unlikeSong, repostSong, unrepostSong } from "../../actions/song_actions";

const mSTP = (state) => ({
  currentUser: state.session.id,
  currentlyPlaying: state.playControls.currentSong,
});

const mDTP = (dispatch) => ({
  selectSong: (song) => dispatch(selectSong(song)),
  playPauseSong: () => dispatch(playPauseSong()),
  addToQueue: (song) => dispatch(addToQueue(song)),
  likeSong: (songId) => dispatch(likeSong(songId)),
  unlikeSong: (songId) => dispatch(unlikeSong(songId)),
  repostSong: (songId) => dispatch(repostSong(songId)),
  unrepostSong: (songId) => dispatch(unrepostSong(songId)),
});

export default connect(mSTP, mDTP)(TrackCardV3);

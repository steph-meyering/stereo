import { connect } from "react-redux";
import MiniPlayer from "./mini_player";
import { playPauseSong } from "../../actions/current_song_actions";

const mSTP = (state) => ({
  currentSong: state.playControls.currentSong,
  playing: state.playControls.currentSong?.playing || false,
});

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
});

export default connect(mSTP, mDTP)(MiniPlayer);

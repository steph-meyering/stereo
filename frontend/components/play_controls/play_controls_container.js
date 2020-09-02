import { connect } from "react-redux";
import PlayControls from "./play_controls";
import { playPauseSong, seek } from "../../actions/current_song_actions";

const mSTP = (state) => ({
  currentlyPlaying: state.playControls.currentSong,
});

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
});

export default connect(mSTP,mDTP)(PlayControls)
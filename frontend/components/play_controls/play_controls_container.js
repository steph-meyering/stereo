import { connect } from "react-redux";
import PlayControls from "./play_controls";
import { playPauseSong, seek, seekClear } from "../../actions/current_song_actions";

const mSTP = (state) => ({
  currentlyPlaying: state.playControls.currentSong,
});

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
  seekClear: () => dispatch(seekClear()),
});

export default connect(mSTP,mDTP)(PlayControls)
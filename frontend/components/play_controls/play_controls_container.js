import { connect } from "react-redux";
import PlayControls from "./play_controls";
import { playPauseSong } from "../../actions/current_song_actions";

const mSTP = state => ({
    currentSong: state.playControls.currentSong
})

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
});

export default connect(mSTP,mDTP)(PlayControls)
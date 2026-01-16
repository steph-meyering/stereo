import { connect } from "react-redux";
import { selectSong, playPauseSong, seek } from "../../actions/current_song_actions";
import { updateSong } from "../../actions/song_actions";
import WaveForm from "./waveform";

const mSTP = (state, ownProps) => {
  return {
    song: ownProps.song,
    currentlyPlaying: state.playControls.currentSong,
    selected: ownProps.selected,
  };
};

const mDTP = (dispatch) => ({
  selectSong: (song) => dispatch(selectSong(song)),
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
  updateSong: (payload) => dispatch(updateSong(payload))
});

export default connect(mSTP, mDTP)(WaveForm);
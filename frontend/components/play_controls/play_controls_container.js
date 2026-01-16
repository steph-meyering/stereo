import { connect } from "react-redux";
import PlayControls from "./play_controls";
import { playPauseSong, seek, selectSong } from "../../actions/current_song_actions";
import {
  playNext,
  playPrevious,
  shuffle,
  removeFromQueue,
  clearQueue,
} from "../../actions/queue_actions";

const mSTP = (state) => ({
  currentlyPlaying: state.playControls.currentSong,
  queue: state.playControls.playQueue.queue,
  played: state.playControls.playQueue.played,
});

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
  seek: (origin, pos) => dispatch(seek(origin, pos)),
  selectSong: (song) => dispatch(selectSong(song)),
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious()),
  toggleShuffle: () => dispatch(shuffle()),
  removeFromQueue: (songId) => dispatch(removeFromQueue(songId)),
  clearQueue: () => dispatch(clearQueue()),
});

export default connect(mSTP,mDTP)(PlayControls)
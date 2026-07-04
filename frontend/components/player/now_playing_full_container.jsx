import { connect } from "react-redux";
import NowPlayingFull from "./now_playing_full";
import { playPauseSong, selectSong, seek } from "../../actions/current_song_actions";
import {
  playNext,
  playPrevious,
  removeFromQueue,
  removeFromQueueIndex,
  clearQueue,
  setQueue,
} from "../../actions/queue_actions";

const mSTP = (state) => {
  const currentSong = state.playControls.currentSong;
  const currentSongData = currentSong ? state.entities.songs[currentSong.id] : null;
  return {
    currentSong,
    currentSongData,
    queue: state.playControls.playQueue.queue,
    played: state.playControls.playQueue.played,
    playing: currentSong?.playing || false,
  };
};

const mDTP = (dispatch) => ({
  playPauseSong: () => dispatch(playPauseSong()),
  selectSong: (song) => dispatch(selectSong(song)),
  seek: (origin, position) => dispatch(seek(origin, position)),
  playNext: () => dispatch(playNext()),
  playPrevious: () => dispatch(playPrevious()),
  removeFromQueue: (songId) => dispatch(removeFromQueue(songId)),
  removeFromQueueIndex: (index) => dispatch(removeFromQueueIndex(index)),
  clearQueue: () => dispatch(clearQueue()),
  setQueue: (queue) => dispatch(setQueue(queue)),
});

export default connect(mSTP, mDTP)(NowPlayingFull);

import { RECEIVE_SONG, RECEIVE_SONGS } from "../actions/song_actions";
import { SEEK } from "../actions/current_song_actions";

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SONG:
      nextState[action.song.id] = action.song;
      return nextState;
    case RECEIVE_SONGS:
      return action.songs;
    case SEEK:
      // will not modify current state but will trigger re-render to sync waveform and playControls component
      return nextState;
    default:
      return state;
  }
};

export default songsReducer;

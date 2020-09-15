import { RECEIVE_SONG, RECEIVE_SONGS, REMOVE_SONG } from "../actions/song_actions";

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case REMOVE_SONG:
      delete nextState[action.songId];
      return nextState;
    case RECEIVE_SONG:
      nextState[action.song.id] = action.song;
      return nextState;
    case RECEIVE_SONGS:
      return action.songs;
    default:
      return state;
  }
};

export default songsReducer;
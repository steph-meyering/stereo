import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST } from "../actions/song_actions";

const playlistsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return action.playlists;
    case RECEIVE_PLAYLIST:
      nextState[action.playlist.id] = action.playlist;
      return nextState;
    default:
      return state;
  }
};

export default playlistsReducer;

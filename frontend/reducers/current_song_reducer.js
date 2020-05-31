import { SELECT_SONG } from "../actions/current_song_actions";

const currentSongReducer = (state = null, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SELECT_SONG:
      nextState["id"] = action.song.id;
      nextState["artist"] = action.song.artist;
      nextState["fileUrl"] = action.song.fileUrl;
      nextState["title"] = action.song.title;
      nextState["photoUrl"] = action.song.photoUrl;
      nextState["playing"] = true;
      return nextState;
    default:
      return state;
  }
};

export default currentSongReducer;

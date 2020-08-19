import { SELECT_SONG, PLAY_PAUSE_SONG, SEEK, SEEK_CLEAR } from "../actions/current_song_actions";
import { RECEIVE_SONG, RECEIVE_SONGS } from "../actions/song_actions";

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
      nextState["seek"] = false;
      return nextState;
    case PLAY_PAUSE_SONG:
      nextState["playing"] = nextState["playing"] === true ? false : true;
      nextState["seek"] = false;
      return nextState;
    case SEEK:
      nextState["seek"] = {
        origin: action.origin,
        position: action.position,
      };
      return nextState;
    default:
      // reset any existing "seek" state,
      if (nextState["seek"]) {
        nextState["seek"] = false;
        return nextState;
      } else {
        return state;
      }
  }
};

export default currentSongReducer;

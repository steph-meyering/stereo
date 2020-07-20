import { SELECT_SONG, PLAY_PAUSE_SONG, SEEK } from "../actions/current_song_actions";

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
    case PLAY_PAUSE_SONG:
      nextState["playing"] = (nextState["playing"] === true ? false : true)
      console.log("playing: ", nextState["playing"])
      return nextState;
    case SEEK:
      // will not modify current state but will trigger re-render to sync waveform and playControls component
      return nextState;
    default:
      return state;
  }
};

export default currentSongReducer;

import { combineReducers } from "redux";
import currentSongReducer from "./current_song_reducer";


const playControlsReducer = combineReducers({
    currentSong: currentSongReducer
})

export default playControlsReducer;
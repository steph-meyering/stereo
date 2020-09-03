import { combineReducers } from "redux";
import currentSongReducer from "./current_song_reducer";
import playQueueReducer from "./play_queue_reducer";


const playControlsReducer = combineReducers({
    currentSong: currentSongReducer,
    playQueue: playQueueReducer
})

export default playControlsReducer;
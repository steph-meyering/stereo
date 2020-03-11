import { SELECT_SONG } from "../actions/song_actions";


const currentSongReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case SELECT_SONG:
            return action.song;
        default:
            return state;
    }
}

export default currentSongReducer;
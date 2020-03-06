import { RECEIVE_SONG } from "../actions/song_actions";


const songsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SONG:
            return ({ [action.song.id]: action.song });
        default:
            return state;
    }
}

export default songsReducer;
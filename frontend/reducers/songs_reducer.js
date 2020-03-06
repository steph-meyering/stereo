import { RECEIVE_SONG, RECEIVE_SONGS } from "../actions/song_actions";


const songsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SONG:
            return ({ [action.song.id]: action.song });
        case RECEIVE_SONGS:
            return action.songs;
        default:
            return state;
    }
}

export default songsReducer;
import * as SongAPIUtil from '../util/song_api_util';

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const SELECT_SONG = "SELECT_SONG";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";

// this action will update the currentSong slice of state
// affect the currentSong reducer (NOT song reducer)
export const selectSong = song => ({
    type: SELECT_SONG,
    song
})

export const receiveSong = song => ({
    type: RECEIVE_SONG,
    song
})

export const receiveSongs = songs => {    
    return ({
        type: RECEIVE_SONGS,
        songs
    })
}

export const receiveSongErrors = errors => ({
    type: RECEIVE_SONG_ERRORS,
    errors
})

export const fetchSong = songId => dispatch => SongAPIUtil.fetchSong(songId)
.then((song) => dispatch(receiveSong(song)));

export const fetchSongs = () => dispatch => SongAPIUtil.fetchSongs()
.then ((songs) => dispatch(receiveSongs(songs)));

export const uploadSong = (song) => dispatch => SongAPIUtil.uploadSong(song)
    .then (() => dispatch(receiveSong(song)),
    err => (dispatch(receiveSongErrors(err.responseJSON))));
import * as SongAPIUtil from '../util/song_api_util';

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const REMOVE_SONG = "REMOVE_SONG";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";


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

export const removeSong = (songId) => {
  return {
    type: REMOVE_SONG,
    songId,
  };
};

export const receiveSongErrors = errors => ({
    type: RECEIVE_SONG_ERRORS,
    errors
})

export const fetchSong = songId => dispatch => SongAPIUtil.fetchSong(songId)
.then((song) => dispatch(receiveSong(song)));

export const fetchSongs = () => dispatch => SongAPIUtil.fetchSongs()
.then ((songs) => dispatch(receiveSongs(songs)));

export const deleteSong = (songId) => (dispatch) =>
  SongAPIUtil.deleteSong(songId).then(() => dispatch(removeSong(songId)));

export const uploadSong = (song) => dispatch => SongAPIUtil.uploadSong(song)
    .then (() => dispatch(receiveSong(song)),
    err => (dispatch(receiveSongErrors(err.responseJSON))));

export const updateSong = ({id, song}) => dispatch => SongAPIUtil.updateSong(id, song)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

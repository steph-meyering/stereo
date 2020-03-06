import * as SongAPIUtil from '../util/song_api_util';

export const RECEIVE_SONG = "RECEIVE_SONG";

export const receiveSong = song => ({
    type: RECEIVE_SONG,
    song
})

export const fetchSong = songId => dispatch => SongAPIUtil.fetchSong(songId)
    .then((song) => dispatch(receiveSong(song)))
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

export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";

export const receivePlaylists = playlists => ({
  type: RECEIVE_PLAYLISTS,
  playlists
});

export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});

export const fetchSong = songId => dispatch => SongAPIUtil.fetchSong(songId)
.then((song) => dispatch(receiveSong(song)));

export const fetchSongs = () => dispatch => SongAPIUtil.fetchSongs()
.then ((songs) => dispatch(receiveSongs(songs)));

export const deleteSong = (songId) => (dispatch) =>
  SongAPIUtil.deleteSong(songId).then(() => dispatch(removeSong(songId)),
  err => console.log(err));

export const fetchPlaylists = () => dispatch =>
  SongAPIUtil.fetchPlaylists()
    .then((playlists) => dispatch(receivePlaylists(playlists)),
    err => console.log(err));

export const fetchPlaylist = (playlistId) => dispatch =>
  SongAPIUtil.fetchPlaylist(playlistId)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const createPlaylist = (playlist) => dispatch =>
  SongAPIUtil.createPlaylist(playlist)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const updatePlaylist = (playlistId, playlist) => dispatch =>
  SongAPIUtil.updatePlaylist(playlistId, playlist)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const deletePlaylist = (playlistId) => dispatch =>
  SongAPIUtil.deletePlaylist(playlistId)
    .then(() => dispatch(fetchPlaylists()),
    err => console.log(err));

export const addSongToPlaylist = (playlistId, payload) => dispatch =>
  SongAPIUtil.addSongToPlaylist(playlistId, payload)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const removeSongFromPlaylist = (playlistId, songId) => dispatch =>
  SongAPIUtil.removeSongFromPlaylist(playlistId, songId)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const reorderPlaylistSong = (playlistId, songId, payload) => dispatch =>
  SongAPIUtil.reorderPlaylistSong(playlistId, songId, payload)
    .then((playlist) => dispatch(receivePlaylist(playlist)),
    err => console.log(err));

export const uploadSong = (song) => dispatch => SongAPIUtil.uploadSong(song)
    .then (() => dispatch(receiveSong(song)),
    err => (dispatch(receiveSongErrors(err.responseJSON))));

export const updateSong = ({id, song}) => dispatch => SongAPIUtil.updateSong(id, song)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

export const likeSong = (songId) => dispatch =>
  SongAPIUtil.likeSong(songId)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

export const unlikeSong = (songId) => dispatch =>
  SongAPIUtil.unlikeSong(songId)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

export const repostSong = (songId) => dispatch =>
  SongAPIUtil.repostSong(songId)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

export const unrepostSong = (songId) => dispatch =>
  SongAPIUtil.unrepostSong(songId)
    .then((song) => dispatch(receiveSong(song)),
    err => console.log(err));

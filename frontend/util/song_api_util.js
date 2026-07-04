import { apiGet, apiPost, apiPatch, apiDelete } from "./api";

export const fetchSong = (songId) => apiGet(`/api/songs/${songId}`);

export const fetchSongs = () => apiGet(`/api/songs`);

// `song` is a FormData instance; passed through untouched.
export const updateSong = (id, song) => apiPatch(`/api/songs/${id}`, song);

// `song` is a FormData instance; passed through untouched.
export const uploadSong = (song) => apiPost(`/api/songs`, song);

export const deleteSong = (songId) => apiDelete(`/api/songs/${songId}`);

export const likeSong = (songId) => apiPost(`/api/songs/${songId}/like`);

export const unlikeSong = (songId) => apiDelete(`/api/songs/${songId}/like`);

export const repostSong = (songId) => apiPost(`/api/songs/${songId}/repost`);

export const unrepostSong = (songId) =>
  apiDelete(`/api/songs/${songId}/repost`);

export const fetchPlaylists = () => apiGet("/api/playlists");

export const fetchPlaylist = (playlistId) =>
  apiGet(`/api/playlists/${playlistId}`);

export const createPlaylist = (playlist) =>
  apiPost("/api/playlists", { playlist });

export const updatePlaylist = (playlistId, playlist) =>
  apiPatch(`/api/playlists/${playlistId}`, { playlist });

export const deletePlaylist = (playlistId) =>
  apiDelete(`/api/playlists/${playlistId}`);

export const addSongToPlaylist = (playlistId, playlistSong) =>
  apiPost(`/api/playlists/${playlistId}/playlist_songs`, {
    playlist_song: playlistSong,
  });

export const removeSongFromPlaylist = (playlistId, songId) =>
  apiDelete(`/api/playlists/${playlistId}/playlist_songs/${songId}`);

export const reorderPlaylistSong = (playlistId, songId, playlistSong) =>
  apiPatch(`/api/playlists/${playlistId}/playlist_songs/${songId}`, {
    playlist_song: playlistSong,
  });

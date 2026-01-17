export const fetchSong = (songId) =>
  $.ajax({
    method: "GET",
    url: `/api/songs/${songId}`,
  });

export const fetchSongs = () => {
  return $.ajax({
    method: "GET",
    url: `/api/songs`,
  });
};

export const updateSong = (id, song) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/songs/${id}`,
    data: song,
    contentType: false,
    processData: false,
  });
};

export const uploadSong = (song) =>
  $.ajax({
    method: "POST",
    url: `/api/songs`,
    data: song,
    contentType: false,
    processData: false,
  });

export const deleteSong = (songId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/songs/${songId}`,
  });

export const likeSong = (songId) =>
  $.ajax({
    method: "POST",
    url: `/api/songs/${songId}/like`,
  });

export const unlikeSong = (songId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/songs/${songId}/like`,
  });

export const repostSong = (songId) =>
  $.ajax({
    method: "POST",
    url: `/api/songs/${songId}/repost`,
  });

export const unrepostSong = (songId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/songs/${songId}/repost`,
  });

export const fetchPlaylists = () =>
  $.ajax({
    method: "GET",
    url: "/api/playlists",
  });

export const fetchPlaylist = (playlistId) =>
  $.ajax({
    method: "GET",
    url: `/api/playlists/${playlistId}`,
  });

export const createPlaylist = (playlist) =>
  $.ajax({
    method: "POST",
    url: "/api/playlists",
    data: { playlist },
  });

export const updatePlaylist = (playlistId, playlist) =>
  $.ajax({
    method: "PATCH",
    url: `/api/playlists/${playlistId}`,
    data: { playlist },
  });

export const deletePlaylist = (playlistId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/playlists/${playlistId}`,
  });

export const addSongToPlaylist = (playlistId, playlistSong) =>
  $.ajax({
    method: "POST",
    url: `/api/playlists/${playlistId}/playlist_songs`,
    data: { playlist_song: playlistSong },
  });

export const removeSongFromPlaylist = (playlistId, songId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/playlists/${playlistId}/playlist_songs/${songId}`,
  });

export const reorderPlaylistSong = (playlistId, songId, playlistSong) =>
  $.ajax({
    method: "PATCH",
    url: `/api/playlists/${playlistId}/playlist_songs/${songId}`,
    data: { playlist_song: playlistSong },
  });

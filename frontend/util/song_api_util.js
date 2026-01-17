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

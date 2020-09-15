export const fetchComment = (commentId) =>
  $.ajax({
    method: "GET",
    url: `/api/comments/${commentId}`
  });

  export const fetchComments = (song_id) => {
    return $.ajax({
      method: "GET",
      url: `/api/songs/${song_id}/comments`,
    });
  };

  export const editComment = (song_id, id, comment) => {
    return $.ajax({
      method: "PATCH",
      url: `/api/songs/${song_id}/comments/${id}`,
      data: comment,
    });
  };

  export const postComment = (song_id, comment) =>
    $.ajax({
      method: "POST",
      url: `/api/songs/${song_id}/comments`,
      data: {comment},
    });

  export const deleteComment = (song_id, commentId) =>
    $.ajax({
      method: "DELETE",
      url: `/api/songs/${song_id}/comments/${commentId}`,
    });

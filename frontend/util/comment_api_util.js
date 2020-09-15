export const fetchComment = (commentId) =>
  $.ajax({
    method: "GET",
    url: `/api/comments/${commentId}`
  });

  export const fetchComments = (song_id) => {
    return $.ajax({
      method: "GET",
      url: `/api/songs/${song_id}/comments`,
      data: song_id
    });
  };

  export const editComment = (id, comment) => {
    return $.ajax({
      method: "PATCH",
      url: `/api/comments/${id}`,
      data: comment,
      contentType: false,
      processData: false,
    });
  };

  export const postComment = (comment) =>
    $.ajax({
      method: "POST",
      url: `/api/comments`,
      data: comment,
    });

  export const deleteComment = (commentId) =>
    $.ajax({
      method: "DELETE",
      url: `/api/comments/${commentId}`,
    });

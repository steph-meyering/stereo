export const fetchComment = (commentId) =>
  $.ajax({
    method: "GET",
    url: `/api/comments/${commentId}`
  });

  export const fetchComments = () => {
    return $.ajax({
      method: "GET",
      url: `/api/comments`,
    });
  };

  export const updateComment = (id, comment) => {
    return $.ajax({
      method: "PATCH",
      url: `/api/comments/${id}`,
      data: comment,
      contentType: false,
      processData: false,
    });
  };

  export const uploadComment = (comment) =>
    $.ajax({
      method: "POST",
      url: `/api/comments`,
      data: comment,
      contentType: false,
      processData: false,
    });

  export const deleteComment = (commentId) =>
    $.ajax({
      method: "DELETE",
      url: `/api/comments/${commentId}`,
    });

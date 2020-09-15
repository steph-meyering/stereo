import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
};

export const removeComment = (commentId) => {
  return {
    type: REMOVE_SONG,
    commentId,
  };
};

export const fetchComment = (songId, commentId) => (dispatch) =>
  CommentAPIUtil.fetchComment(songId, commentId).then((comment) =>
    dispatch(receiveComment(comment))
  );

export const fetchComments = (songId) => (dispatch) =>
  CommentAPIUtil.fetchComments(songId).then((songs) =>
    dispatch(receiveComments(songs))
  );

export const deleteComment = (songId, commentId) => (dispatch) =>
  CommentAPIUtil.deleteComment(songId, commentId).then(() =>
    dispatch(removeComment(commentId))
  );

export const postComment = (songId, comment) => (dispatch) =>
  CommentAPIUtil.postComment(songId, comment).then(
    () => dispatch(receiveComment(comment)),
    (err) => console.log(err)
  );

export const editComment = (songId, id, comment ) => (dispatch) =>
  CommentAPIUtil.editComment(songId,id, comment).then(
    (comment) => dispatch(receiveComment(comment)),
    (err) => console.log(err)
  );
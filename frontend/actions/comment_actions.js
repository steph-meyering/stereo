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

export const fetchComment = (commentId) => (dispatch) =>
  CommentAPIUtil.fetchComment(commentId).then((comment) => dispatch(receiveComment(comment)));

export const fetchComments = (songId) => (dispatch) =>
  CommentAPIUtil.fetchComments(songId).then((songs) =>
    dispatch(receiveComments(songs))
  );

export const deleteComment = (commentId) => (dispatch) =>
  CommentAPIUtil.deleteComment(commentId).then(() => dispatch(removeComment(commentId)));

export const postComment = (comment) => (dispatch) =>
  CommentAPIUtil.postComment(comment).then(
    () => dispatch(receiveComment(comment)),
    (err) => console.log(err)
  );

export const editComment = ({ id, comment }) => (dispatch) =>
  CommentAPIUtil.editComment(id, comment).then(
    (comment) => dispatch(receiveComment(comment)),
    (err) => console.log(err)
  );

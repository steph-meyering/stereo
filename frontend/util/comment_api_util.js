import { apiGet, apiPost, apiPatch, apiDelete } from "./api";

export const fetchComment = (commentId) => apiGet(`/api/comments/${commentId}`);

export const fetchComments = (song_id) =>
  apiGet(`/api/songs/${song_id}/comments`);

export const editComment = (song_id, id, comment) =>
  apiPatch(`/api/songs/${song_id}/comments/${id}`, comment);

export const postComment = (song_id, comment) =>
  apiPost(`/api/songs/${song_id}/comments`, { comment });

export const deleteComment = (song_id, commentId) =>
  apiDelete(`/api/songs/${song_id}/comments/${commentId}`);

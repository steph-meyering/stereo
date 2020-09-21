import { connect } from "react-redux";
import CommentIndex from "./comment_index";

const { postComment, fetchComment, fetchComments, editComment, deleteComment } = require("../../actions/comment_actions");


const mSTP = (state) => ({
  comments: Object.values(state.entities.comments)
})

const mDTP = (dispatch) => ({
  fetchComment: (id) => dispatch(fetchComment(id)),
  fetchComments: (songId) => dispatch(fetchComments(songId)),
  postComment: (comment) => dispatch(postComment(comment)),
  editComment: (id, comment) => dispatch(editComment(id, comment)),
  deleteComment: (id) => dispatch(deleteComment(id)),
});

export default connect(mSTP, mDTP)(CommentIndex);
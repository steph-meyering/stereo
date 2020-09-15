import { RECEIVE_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT } from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_COMMENT:
      nextState[action.comment.id] = action.comment;
      return nextState;
    case RECEIVE_COMMENTS:
      return action.comments
    case REMOVE_COMMENT:
      delete nextState[action.commentId]
      return nextState
    default:
      return state;
  }
};

export default commentsReducer;
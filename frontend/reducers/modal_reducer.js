import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const modalReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
      case OPEN_MODAL:
        return action.modal;
      case CLOSE_MODAL:
        if (window.localStorage.editTarget) {
          // clean up local storage if modal was song edit component
          window.localStorage.removeItem('editTarget');
        }
        return null;
      case RECEIVE_CURRENT_USER:
        return null;
      default:
        return state;
    }
};

export default modalReducer;
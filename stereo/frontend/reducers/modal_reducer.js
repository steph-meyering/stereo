import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";

const _nullModal = Object.freeze({
    modal: null
});

const modalReducer = (state = _nullModal, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_MODAL:
            return action.modal
        case CLOSE_MODAL:
            return {modal: null}
        default:
            return state;
    }
};

export default modalReducer;
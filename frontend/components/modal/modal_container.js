import { connect } from "react-redux";
import { closeModal } from '../../actions/modal_actions';
import Modal from "./modal";


const mapStateToProps = state => {
    // debugger;
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    // debugger;
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
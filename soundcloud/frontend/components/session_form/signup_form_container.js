import { signup } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from './session_form';
import { withRouter } from "react-router-dom";

const mSTP = ({ errors }) => ({
    errors: errors.session,
    formType: 'signup'
});

const mDTP = dispatch => ({
    processForm: (user) => dispatch(signup(user))
});

export default withRouter(connect(mSTP, mDTP)(SessionForm))
import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from './session_form';
import { withRouter } from "react-router-dom";

const mSTP = ({errors}) => ({
    errors: errors.session,
    formType: 'login'
})

const mDTP = dispatch => ({
    processFrom: (user) => dispatch(login(user))
})


export default withRouter(connect(mSTP, mDTP)(SessionForm))
import React from 'react';
import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from './session_form';
import { withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";

const mSTP = ({errors}) => ({
    errors: errors.session,
    formType: 'login'
})

const mDTP = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    otherForm: (
        <button onClick={() => dispatch(openModal('signup'))}>Signup</button>
    )
})


export default withRouter(connect(mSTP, mDTP)(SessionForm))
import React from 'react';
import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from './session_form';
import { openModal } from "../../actions/modal_actions";

const mSTP = ({errors}) => ({
    errors: errors.session,
    formType: 'login'
})

const mDTP = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    guestLogin: () => dispatch(login({username: "Demo User", password: "password"})),
    otherForm: (
        <a onClick={() => dispatch(openModal('signup'))}>Signup</a>
    )
})

export default connect(mSTP, mDTP)(SessionForm)
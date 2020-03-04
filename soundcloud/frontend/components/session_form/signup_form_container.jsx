import React from 'react';
import { signup } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionForm from './session_form';
import { withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";

const mSTP = ({ errors }) => ({
    errors: errors.session,
    formType: 'signup'
});

const mDTP = dispatch => ({
    processForm: (user) => dispatch(signup(user)),
    otherForm: (
        <button onClick={() => dispatch(openModal('login'))}>Login</button>
    )
});

export default withRouter(connect(mSTP, mDTP)(SessionForm))
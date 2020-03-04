import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';
import { openModal } from './actions/modal_actions';

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // testing start
    // const store = configureStore();
    // window.signup = signup;
    // window.login = login;
    // window.logout = logout;
    // window.getState = store.getState;
    // window.openModal = openModal;
    // window.dispatch = store.dispatch; 
    // testing end

    const root = document.getElementById("root");
    ReactDOM.render(<Root store = {store}/>, root);
});

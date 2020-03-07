import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './actions/session_actions';
import configureStore from './store/store';
import Root from './components/root';
import { openModal } from './actions/modal_actions';
import { fetchSongs } from './actions/song_actions';

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

    // TESTING START
    window.dispatch = store.dispatch;
    window.fetchSongs = fetchSongs;
    window.signup = signup;

    // TESTING END

    const root = document.getElementById("root");
    ReactDOM.render(<Root store = {store}/>, root);
});

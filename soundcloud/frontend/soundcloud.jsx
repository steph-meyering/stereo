import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login } from './util/session_api_util';
import configureStore from './store/store';
// import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    // testing start
    const store = configureStore();
    window.signup = signup;
    window.login = login;
    window.getState = store.getState;
    window.dispatch = store.dispatch; 
    // testing end
    
    ReactDOM.render(<h1>hola</h1>, root);
});
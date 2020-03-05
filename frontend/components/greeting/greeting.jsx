import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout, openModal}) => {
    if (currentUser) {
        return (
            <div>
                <p>Hello, {currentUser.username}</p>
                <button onClick={() => logout()}>Sign out</button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>You aren't logged in</h3>
                <button onClick={()=> openModal('login')}>Login</button>
                <br/>
                <button onClick={() => openModal('signup')}>Signup</button>
            </div>

        )
    }
}

export default Greeting;
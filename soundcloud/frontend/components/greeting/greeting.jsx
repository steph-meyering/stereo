import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout}) => {
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
                <Link to={`/login`}>Login</Link>
                <br/>
                <Link to={`/signup`}>Sign up</Link>
            </div>

        )
    }
}

export default Greeting;
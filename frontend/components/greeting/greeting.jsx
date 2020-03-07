import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout, openModal}) => {
    if (currentUser) {
        return (
            <div>
                <p>Hello, {currentUser.username}</p>
                <button onClick={() => logout()}>Sign out</button>
                <br />
                <Link to='/songs/1'>SONG (hardcoded)</Link>
                <br/>
                <Link to='/songs'>Song Index in greeting container</Link>
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
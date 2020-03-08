import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, logout, openModal}) => {
    if (currentUser) {
        return (
            <div>
                <p>Hello, {currentUser.username}</p>
                <button onClick={() => logout()}>Sign out</button>
                <br />
                <Link to='/songs/1'>SONG (hardcoded)</Link>
                <br/>
                <Link to='/songs'>Song Index in navbar container</Link>
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

export default Navbar;
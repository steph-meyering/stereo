import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, logout, openModal}) => {
    if (currentUser) {
        return (
            <div className='navbar-div'>
                <h1 className='stereo-icon'>(((Stereo)))</h1>
                <p>Hello, {currentUser.username}</p>
                <Link to='/songs'>Songs</Link>
                <button className='sign-out-button' onClick={() => logout()}>Sign out</button>
            </div>
        )
    } else {
        return (
            <div className='navbar-div'>
                <Link className='stereo-icon' to='/'>(((Stereo)))</Link>
                <h3>You aren't logged in</h3>
                <div className='navbar-buttons'>
                    <button className='sign-in-button' onClick={()=> openModal('login')}>Sign in</button>
                    <button className='create-account-button' onClick={() => openModal('signup')}>Create account</button>
                </div>
            </div>

        )
    }
}

export default Navbar;
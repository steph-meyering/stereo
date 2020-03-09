import React from 'react';

class UserSidebar extends React.Component {
    render(){
        return(
            <div className='sidebar'>
                <div className='bio'>BIO</div>
                <div className='liked-songs'>Likes</div>
                <div className='following'>Following</div>
                <div className='comments'>Comments</div>
                <div className='app-download'>App download</div>
            </div>
        )
    }
}

export default UserSidebar;
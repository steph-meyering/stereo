import React from 'react';

class PlayControls extends React.Component {
    render(){
        let currentSong = null;
        return (
            <span id='footer'> Play controls go here 
            <audio controls src={currentSong}></audio>
            </span>
        )
    }
}

export default PlayControls;
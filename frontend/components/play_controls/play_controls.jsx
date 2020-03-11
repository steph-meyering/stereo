import React from 'react';

class PlayControls extends React.Component {
    render(){
        if (this.props.currentSong === null) {
            return (
                <span id='footer'> Play controls go here
                    <audio controls src="null"></audio>
                </span>
            )    
        } else {
            return (
                <span id='footer'> Play controls go here 
                <audio controls autoPlay src={this.props.currentSong.fileUrl}></audio>
                </span>
            )
        }
    }
}

export default PlayControls;
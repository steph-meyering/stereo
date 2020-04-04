import React from 'react';

class PlayControls extends React.Component {
    render(){
        if (this.props.currentSong === null) {
            return (
                <span id='play-controls'>
                    <audio controls src="null"></audio>
                </span>
            )    
        } else {
            return (
                <span id='play-controls'> 
                    <audio controls autoPlay src={this.props.currentSong.fileUrl}></audio>
                    <div className='currently-playing-song-data'>
                        <div>
                            <img src={this.props.currentSong.photoUrl} alt={this.props.currentSong.title} />
                        </div>
                        <div>
                            <p className='uploader'>{this.props.currentSong.artist}</p>
                            <p className='song-title'>{this.props.currentSong.title}</p>
                        </div>
                    </div>
                </span>
            )
        }
    }
}

export default PlayControls;
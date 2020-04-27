import React from 'react';
import Slide from "react-reveal/Slide";


class PlayControls extends React.Component {
    render(){
        if (this.props.currentSong === null) {
            return (
                null
            );
        } else {
            return (
                <Slide bottom>
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
                </Slide>
            )
        }
    }
}

export default PlayControls;
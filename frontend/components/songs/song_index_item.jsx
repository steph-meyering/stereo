import React from 'react';
import ReactDOM from 'react-dom';


class SongIndexItem extends React.Component {
    render() {
        // // causes an error without this if statement
        // if (this.props.song === undefined) return null;
        return (
            <div className='song-index-item'>
                <img 
                    className='album-cover' 
                    src={this.props.song.photoUrl} 
                    alt={this.props.song.title}
                    />
                <div className='info-and-wave'>
                    <div className='song-index-info'>
                        <div 
                            className='play-button' 
                            onClick={() => this.props.selectSong(this.props.song)} 
                        >
                        </div>
                        <div>
                            <p>{this.props.song.artist}</p>
                            <h3>{this.props.song.title}</h3>
                        </div>
                    </div>
                    <div className='waveform'>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongIndexItem;
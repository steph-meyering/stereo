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
                <div>
                    <p>uploader ID: {this.props.song.artistId}</p>
                    <h3>{this.props.song.title}</h3>
                    <audio controls src={this.props.song.fileUrl}></audio>
                </div>
            </div>
        )
    }
}

export default SongIndexItem;
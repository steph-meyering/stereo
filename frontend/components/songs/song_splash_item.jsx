import React from 'react';
import ReactDOM from 'react-dom';


class SongSplashItem extends React.Component {
    render() {
        // // causes an error without this if statement
        // if (this.props.song === undefined) return null;
        return (
            <div className='song-splash-item'>
                <img
                    className='album-cover'
                    src={this.props.song.photoUrl}
                    alt={this.props.song.title}
                />
                <div
                    className='play-button'
                    onClick={() => this.props.selectSong(this.props.song)}
                >
                </div>
                <div className='splash-song-info'>
                    <h3>{this.props.song.title}</h3>
                    <h3>{this.props.song.artist}</h3>
                </div>
            </div>
        );
    }
}

export default SongSplashItem;
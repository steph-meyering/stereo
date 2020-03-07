import React from 'react';
import SongIndexItem from './song_index_item';

class SongIndex extends React.Component {
    componentDidMount(){
        this.props.fetchSongs()
    }

    render(){
        if (this.props.songs.length === 0) return null;
        let songItems = this.props.songs.map((song) => <SongIndexItem
                                                            song = {song}
                                                            key = {song.id}
                                                        />)
        return(
            <div className="song-index">
                <ul>
                    {songItems}
                </ul>
            </div>
        )
    }
}

export default SongIndex;
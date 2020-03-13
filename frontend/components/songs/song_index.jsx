import React from 'react';
import SongIndexItem from './song_index_item';
import SongSplashItem from './song_splash_item';

class SongIndex extends React.Component {
    constructor(props) {
        super(props);
        this.withWaveForm = this.withWaveForm.bind(this);
    }
    
    componentDidMount(){
        this.props.fetchSongs()
    }

    withWaveForm(){
        let component = (this.props.match.path === '/') ? SongSplashItem : SongIndexItem;
        return component;
    }
    
    render(){
        if (this.props.songs.length === 0) return null;
        // let songItems = null;
        debugger;
        
        let SongComponent = this.withWaveForm()

        let songItems = this.props.songs.map((song) => <SongComponent
            song={song}
            selectSong={this.props.selectSong}
            key={song.id}
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
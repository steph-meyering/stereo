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

    isSplash(){
        let className = (this.props.match.path === '/') ? "splash-index" : "song-index"
        return className
    }

    addFiller(){
        if (this.props.match.path === '/') {
            return(
                <li className='splash-filler-item'></li>
            )
        }
    }
    
    render(){
        if (this.props.songs.length === 0) return null;
        let SongComponent = this.withWaveForm()

        let songItems = this.props.songs.map((song) => <SongComponent
            song={song}
            selectSong={this.props.selectSong}
            key={song.id}
        />)
        return(
            <div className={this.isSplash().concat('-main')}>
                <ul className={this.isSplash()}>
                    {songItems}
                    {this.addFiller()}
                    {this.addFiller()}
                    {this.addFiller()}
                    {this.addFiller()}
                </ul>
            </div>
        )
    }
}

export default SongIndex;
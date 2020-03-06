import React from 'react'

class SongShow extends React.Component {
    componentDidMount(){
        this.props.fetchSong(this.props.match.params.songId);
    }

    render(){
        debugger
        if (this.props.song === undefined) return null;
        return(
            <div>
                <h2>{this.props.song.title}</h2>
            </div>
        )
    }
}

export default SongShow;
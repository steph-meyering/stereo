import React from 'react'

class SongShow extends React.Component {
    componentDidMount(){
        this.props.fetchSong(this.props.match.params.songId);
    }

    render(){
        // causes an error without this if statement
        if (this.props.song === undefined) return null;
        return(
            <div>
                <h1>{this.props.song.title}</h1>
                <audio controls src={this.props.song.fileUrl}></audio>
            </div>
        )
    }
}

export default SongShow;
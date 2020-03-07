import React from 'react';

class SongIndexItem extends React.Component {
    render() {
        // // causes an error without this if statement
        // if (this.props.song === undefined) return null;
        return (
            <div>
                <h1>{this.props.song.title}</h1>
                <audio controls src={this.props.song.fileUrl}></audio>
            </div>
        )
    }
}

export default SongIndexItem;
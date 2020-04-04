import { connect } from "react-redux";
import { fetchSong, selectSong } from "../../actions/song_actions";
import SongShow from "./song_show";

const mSTP = (state, ownProps) => {
    if (ownProps.match === "undefined"){
        return({song: undefined})
    };
    return({
        song: state.entities.songs[ownProps.match.params.songId]
    })
}

const mDTP = dispatch => ({
    fetchSong: (songId) => dispatch(fetchSong(songId)),
    selectSong: (song) => dispatch(selectSong(song))
})

export default connect(mSTP, mDTP)(SongShow);
import { connect } from "react-redux";
import { fetchSong } from "../../actions/song_actions";
import SongShow from "./song_show";
import { selectSong } from "../../actions/current_song_actions";

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
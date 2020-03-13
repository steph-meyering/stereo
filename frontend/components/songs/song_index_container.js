import { fetchSongs, selectSong } from "../../actions/song_actions";
import { connect } from "react-redux";
import SongIndex from "./song_index";
import { withRouter } from "react-router-dom";

const mSTP = state => {
    return({
        songs: Object.values(state.entities.songs)
    })
}

const mDTP = dispatch => ({
    fetchSongs: () => dispatch(fetchSongs()),
    selectSong: (song) => dispatch(selectSong(song))
})

export default withRouter(connect(mSTP, mDTP)(SongIndex));
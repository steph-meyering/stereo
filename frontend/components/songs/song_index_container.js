import { fetchSongs, selectSong } from "../../actions/song_actions";
import { connect } from "react-redux";
import SongIndex from "./song_index";
import { withRouter } from "react-router-dom";
import { requestUser } from "../../actions/user_actions";

const mSTP = state => {
    return({
        songs: Object.values(state.entities.songs),
        currentUser: state.session.id
    })
}

const mDTP = dispatch => ({
    fetchSongs: () => dispatch(fetchSongs()),
    selectSong: (song) => dispatch(selectSong(song)),
})

export default withRouter(connect(mSTP, mDTP)(SongIndex));
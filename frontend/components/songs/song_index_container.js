import { fetchSongs, selectSong } from "../../actions/song_actions";
import { connect } from "react-redux";
import SongIndex from "./song_index";
import { withRouter } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";

const mSTP = state => {
    return({
        songs: Object.values(state.entities.songs),
        currentUser: state.session.id
    })
}

const mDTP = dispatch => ({
    fetchSongs: () => dispatch(fetchSongs()),
    selectSong: (song) => dispatch(selectSong(song)),
    openModal: (modal) => dispatch(openModal(modal))
})

export default withRouter(connect(mSTP, mDTP)(SongIndex));
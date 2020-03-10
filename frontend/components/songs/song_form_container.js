import { uploadSong } from "../../actions/song_actions";
import { connect } from "react-redux";
import SongForm from "./song_form";

const mSTP = state => ({
    currentUserId: state.session.id
})

const mDTP = dispatch => ({
    uploadSong: (song) => dispatch(uploadSong(song))
})

export default connect(mSTP, mDTP)(SongForm)
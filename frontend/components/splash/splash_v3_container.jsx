import { connect } from "react-redux";
import SplashV3 from "./splash_v3";
import { fetchSongs } from "../../actions/song_actions";

const mSTP = (state) => ({
  songs: Object.values(state.entities.songs),
  currentUser: state.session.id,
});

const mDTP = (dispatch) => ({
  fetchSongs: () => dispatch(fetchSongs()),
});

export default connect(mSTP, mDTP)(SplashV3);

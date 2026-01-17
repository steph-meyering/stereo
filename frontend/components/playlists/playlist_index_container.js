import { connect } from "react-redux";
import PlaylistIndex from "./playlist_index";
import { fetchPlaylists } from "../../actions/song_actions";

const mSTP = (state) => ({
  playlists: state.entities.playlists,
});

const mDTP = (dispatch) => ({
  fetchPlaylists: () => dispatch(fetchPlaylists()),
});

export default connect(mSTP, mDTP)(PlaylistIndex);

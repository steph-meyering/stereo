import { connect } from "react-redux";
import PlayControls from "./play_controls";

const mSTP = state => ({
    currentSong: state.playControls.currentSong
})

export default connect(mSTP,null)(PlayControls)
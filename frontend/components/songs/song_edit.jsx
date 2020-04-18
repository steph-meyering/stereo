import React from "react";
import { connect } from "react-redux";

class SongEdit extends React.Component {
  constructor(props) {
    debugger
    super(props);
    this.state = {
      // title: "",
      // genre: "",
      // artistId: this.props.currentUserId,
      // file: null,
      // wave: null,
      // photo: null,
      // photoUrl: null,
    }
  }
  
  render(){
    return(
      <div className="song-edit-modal">
        <h1>Hello, this is the Song Edit Component</h1>
        <h1>{window.localStorage.getItem('editTarget')}</h1>
      </div>
    )
  }
}

const mSTP = (state) => ({
  song: state.entities.songs[window.localStorage.getItem("editTarget")],
});

// const mDTP = dispatch

export default connect(mSTP, null)(SongEdit)


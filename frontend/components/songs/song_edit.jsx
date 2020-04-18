import React from "react";
import { connect } from "react-redux";

class SongEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.song;
    // title: "",
    // genre: "",
    // artistId: this.props.currentUserId,
    // file: null,
    // wave: null,
    // photo: null,
    // photoUrl: null,
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handlePhoto(e) {
    const photoFile = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photo: photoFile, photoUrl: fileReader.result });
    };
    if (photoFile) {
      fileReader.readAsDataURL(photoFile);
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="song-edit-modal">
        <h1>Hello, this is the Song Edit Component</h1>
        <h1>{window.localStorage.getItem("editTarget")}</h1>
        <div className="song-upload-form-container">
          <form onSubmit={this.handleSubmit}>
            <h3></h3>
            <div className="song-upload-form">
              <div className="cover-photo-div">
                <div className="cover-preview">
                  <img src={this.state.photoUrl} />
                  <label
                    className="image-upload-button"
                    htmlFor="cover-photo-upload"
                  >
                    Edit
                  </label>
                  <input
                    id="cover-photo-upload"
                    className="hide"
                    type="file"
                    onChange={this.handlePhoto}
                    accept="image/jpeg,image/pjpeg,image/gif,image/png"
                  />
                </div>
              </div>
              <br />
              <div className="fields-div">
                <h3>Title *</h3>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.update("title")}
                />
                <br />
                <h3>Genre </h3>
                <input
                  type="text"
                  value={this.state.genre}
                  onChange={this.update("genre")}
                />
                <br />
              </div>
            </div>
            <button className="cancel-upload">Cancel</button>
            <button className="save-upload" type="submit">
              Save
            </button>
          </form>
          {/* {this.renderErrors()} */}
          <div id="waveform-container"></div>
          <div id="stored-waveform"></div>
        </div>
      </div>
    );
  }
}

const mSTP = (state) => ({
  song: state.entities.songs[window.localStorage.getItem("editTarget")],
});

// const mDTP = dispatch

export default connect(mSTP, null)(SongEdit)


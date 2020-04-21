import React from "react";
import { connect } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { updateSong } from "../../actions/song_actions";
import { closeModal } from "../../actions/modal_actions";

class SongEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.song;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.renderWave()
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song[title]", this.state.title);
    formData.append("song[genre]", this.state.genre);
    formData.append("song[artist_id]", this.state.artistId);
    formData.append("song[waveform]", this.state.waveform);
    if (this.state.file) {
      formData.append("song[file]", this.state.file);
    }
    if (this.state.photo) {
      formData.append("song[photo]", this.state.photo);
    };
    this.props.updateSong({id: this.state.id, song: formData}).then(this.props.closeModal)
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

  renderWave() {
    let wave = WaveSurfer.create({
      container: "#waveform-container",
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
    });

    // Check if waveform peak data exists, and use it to render waveform 
    // immediately
    if (this.state.waveform && this.state.waveform !== "undefined") {
      wave.load("#", JSON.parse(this.state.waveform));
      console.log("use saved waveform data");
    // Otherwise, load the file, calculate peak data and add it to local state 
    } else { 
      wave.load(this.state.fileUrl);
      wave.on("ready", () =>
        wave
          .exportPCM(1024, 10000, true)
          .then((res) => this.setState({ waveform: res }))
      );
      console.log("load song and calc waveform data");
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="song-edit-modal">
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
            <div id="waveform-container"></div>
            <button className="cancel-upload" type="button" onClick={this.props.closeModal}>
              Cancel
            </button>
            <button className="save-upload" type="submit">
              Save
            </button>
          </form>
          {/* {this.renderErrors()} */}
        </div>
      </div>
    );
  }
}

const mSTP = (state) => ({
  song: state.entities.songs[window.localStorage.getItem("editTarget")],
});

const mDTP = dispatch => ({
  updateSong: (song) => dispatch(updateSong(song)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(SongEdit);


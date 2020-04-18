import React from "react";
import { uploadSong } from "../../actions/song_actions";
import WaveSurfer from "wavesurfer.js";

class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      genre: "",
      artistId: this.props.currentUserId,
      file: null,
      wave: null,
      photo: null,
      photoUrl: null,
      uploading: false,
      seekStep: 0.00,
      seekPos: 0.00,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.incrementWave = this.incrementWave.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleFile(e) {
    // Destroy existing wave element if a different audio file is selected
    if (this.state.wave) {this.state.wave.destroy()}

    // Create a blank wave element when an audio file is selected
    let wave = WaveSurfer.create({
      container: "#waveform-container",
      barWidth: 2,
      barHeight: 1, // the height of the wave
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
    });

    // add wave to local state
    this.setState({wave})
    const audioFile = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      // TEST: store audio file as dataURL in local state
      this.setState({ waveUrl: fileReader.result, waveData: null });
      
      // draw waveform once file is loaded
      this.state.wave.load(fileReader.result);
    };
    if (audioFile) {
      fileReader.readAsDataURL(audioFile);
    }
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

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song[title]", this.state.title);
    formData.append("song[genre]", this.state.genre);
    formData.append("song[artist_id]", this.state.artistId);
    if (this.state.file) {
      formData.append("song[file]", this.state.file);
    }
    if (this.state.photo) {
      formData.append("song[photo]", this.state.photo);
    }
    this.setState({
      uploading: true,
    });
    console.log("starting upload");
    this.props.uploadSong(formData).then(() => console.log("done"));
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

  saveWaveImage() {
    const waveData = this.state.wave.exportImage();
    this.setState({ waveData });
    this.calcSeekStep();

  }

  savePeakData() {
    this.state.wave
      .exportPCM(1024, 10000, true)
      .then((res) => {
        this.setState({ waveData: res })
      });
  }

  useSavedWaveImage() {
    let img = document.getElementById("yoyoyo");
    img.src = this.state.waveData;
  }

  useSavedPeakData() {
    this.state.wave.load(this.state.waveUrl, JSON.parse(this.state.waveData))
    console.log(this.state.waveData);
  }

  incrementWave() {
    if (this.state.seekPos <= 1.00){
      this.state.wave.seekTo(this.state.seekPos);
      this.setState({seekPos: this.state.seekPos + this.state.seekStep})
    } else {clearInterval()}
  }
  
  calcSeekStep() {
    let container = document.getElementById("waveform-container");
    let numBars = container.offsetWidth / 3 // 2px per bar and 1px spacing
    let duration = this.state.wave.getDuration()
    let barsPerSec = numBars / this.state.wave.getDuration();
    console.log(barsPerSec);
    let seekStep = 1/(numBars*2);
    let timeStep = 1000/(barsPerSec*2);
    this.setState({seekStep, timeStep})
  }
  
  render() {
    const preview = this.state.photoUrl ? (
      <img src={this.state.photoUrl} />
    ) : (
      <div className="place-holder-cover"></div>
    );

    return (
      <div className="upload-background">
        <div className="song-upload-form-container">
          <form onSubmit={this.handleSubmit}>
            <h3>Please select an audio file to upload </h3>
            <input
              className="audio-upload"
              type="file"
              onChange={this.handleFile}
            />
            <div className="song-upload-form">
              <div className="cover-photo-div">
                <div className="cover-preview">
                  {preview}
                  <label
                    className="image-upload-button"
                    htmlFor="cover-photo-upload"
                  >
                    Upload image
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
                {/* <h3>Artist ID </h3>
                                <input
                                    type="text"
                                    value={this.state.artistId}
                                    onChange={this.update('artistId')}
                                />
                                <br/> */}
              </div>
            </div>
            <button className="cancel-upload">Cancel</button>
            <button className="save-upload" type="submit">
              Save
            </button>
          </form>
          {this.renderErrors()}
          <div id="waveform-container"></div>
          <div id="stored-waveform"></div>
          <button type="button" onClick={() => this.saveWaveImage()}>
            save waveform IMAGE
          </button>
          <button type="button" onClick={() => this.useSavedWaveImage()}>
            useSavedWaveImage
          </button>
          <button type="button" onClick={() => this.savePeakData()}>
            save PEAK DATA
          </button>
          <button type="button" onClick={() => this.useSavedPeakData()}>
            useSavedPeakData
          </button>
          <button onClick={() => {
            this.state.wave.setMute(true)
            this.state.wave.playPause()}
            }>
            Play/Pause
          </button>
          <button onClick={() => {
                  this.setState({
                    seekPos: 0,
                  });
            setInterval(this.incrementWave, this.state.timeStep)
          }}>
            play / seek
          </button>
          <img src="#" alt="" className="test" id="yoyoyo" />
        </div>
      </div>
    );
  }
}

export default SongForm;

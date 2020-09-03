import React from "react";

class VolumeControls extends React.Component {
  constructor(props) {
    super(props);
    this.selecting = false;
    this.dragEndOnMute = false;
    this.lastVolume = 1;
    this.state = {
      volume: 1,
    };
  }

  componentDidUpdate() {
    this.filledAxis.style.height = `${this.state.volume * 100}%`;
    this.audio.volume = this.state.volume;
    switch (true) {
      case this.state.volume === 0:
        this.trigger.className = "player-button player-volume-muted";
        break;
      case this.state.volume < 0.5:
        this.trigger.className = "player-button player-volume-low";
        break;
      case this.state.volume >= 0.5:
        this.trigger.className = "player-button player-volume-high";
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.audio = document.getElementById("audio-element");
    this.selected = document.getElementById("volume-slider-thumb");
    this.sliderBox = document.getElementById("volume-slider-box");
    this.sliderAxis = document.getElementById("volume-slider-axis");
    this.filledAxis = document.getElementById("volume-slider-axis-filled");
    this.trigger = document.getElementById("volume-button");
    this.trigger.addEventListener("mouseenter", (e) =>
      this.getSliderDimensions(e)
    );
    document.addEventListener("mouseup", (e) => {
      if (this.selecting){
        this.dragEnd(e)
      }
    });
    document.addEventListener("mousemove", (e) => {
      if (this.selecting) {
        this.dragMove(e);
      }
    });
  }

  getSliderDimensions(e) {
    let slider = this.sliderAxis.getBoundingClientRect();
    this.top = slider.top;
    this.bottom = slider.bottom;
    this.range = this.bottom - this.top;
  }

  convertPositionToVolume(pos) {
    let tempVol = (this.bottom - pos) / this.range;
    tempVol = tempVol.toFixed(2);
    if (tempVol < 0) {
      tempVol = 0;
    } else if (tempVol > 1) {
      tempVol = 1;
    }
    return tempVol;
  }

  dragStart(e) {
    this.selecting = true;
    this.sliderBox.classList.add("active");
    let tempVol = this.convertPositionToVolume(e.clientY);
    this.setState({ volume: tempVol });
  }

  dragMove(e) {
    let tempVol = this.convertPositionToVolume(e.clientY);
    this.setState({ volume: tempVol });
  }

  dragEnd(e) {
    this.selecting = false;
    this.sliderBox.classList.remove("active");
    if (e.target.id === "volume-button"){
      this.dragEndOnMute = true;
    }
  }

  toggelMute(e){
    if (e.target.id !== "volume-button" || this.dragEndOnMute) {
      this.dragEndOnMute = false;
      return;
    }
    if (this.state.volume > 0) {
      this.lastVolume = this.state.volume;
      this.setState({ volume: 0 });
    } else {
      this.setState({ volume: this.lastVolume });
    }
  }
  
  render() {
    return (
      <div
        id="volume-button"
        className="player-volume-high player-button"
        onClick={(e) => this.toggelMute(e)}
      >
        <div id="volume-slider-box" onMouseDown={(e) => this.dragStart(e)}>
          <div id="volume-slider-axis">
            <div id="volume-slider-axis-filled" />
            <div id="volume-slider-thumb" />
          </div>
        </div>
      </div>
    );
  }
}

export default VolumeControls;

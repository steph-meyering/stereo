import React from "react";

class VolumeControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="volume-slider-box">
        <div id="volume-slider-axis">
          <div id="volume-slider-axis-filled" />
          <div id="volume-slider-thumb" />
        </div>
      </div>
    );
  }

}

export default VolumeControls;
import React from "react";
import { initWave } from "../../util/waveform_util";

class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.wave = null;
  }

  componentDidMount() {
    this.wave = initWave("#www");
    this.wave.load(this.props.fileUrl, JSON.parse(this.props.peakData));
  }

  render(){
    
    return (
      <div>Helloooooo
        <div id="www"></div>
      </div>
    )
  }

  
  
  
}

export default WaveForm;
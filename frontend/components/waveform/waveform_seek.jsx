import React from "react";

class WaveformSeek extends React.Component {
  constructor(props) {
    super(props);
    this.waveformRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.onSeek) return;

    const rect = this.waveformRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    this.props.onSeek(percentage);
  }

  render() {
    const { waveformData, progress = 0, height = 60 } = this.props;
    
    // If we have actual waveform data, use it; otherwise use placeholder
    const bars = waveformData || Array.from({ length: 100 }, () => Math.random() * 0.8 + 0.2);

    return (
      <div
        className="waveform-seek"
        ref={this.waveformRef}
        onClick={this.handleClick}
        style={{ height: `${height}px` }}
      >
        <div className="waveform-bars">
          {bars.map((amplitude, i) => {
            const barProgress = i / bars.length;
            const isPlayed = barProgress < progress;

            return (
              <div
                key={i}
                className={`waveform-bar ${isPlayed ? 'played' : 'unplayed'}`}
                style={{
                  height: `${amplitude * 100}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default WaveformSeek;

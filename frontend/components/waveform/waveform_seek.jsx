import React from "react";

// Default stride matches the classic SoundCloud/wavesurfer look:
// 2px bars with 1px gaps. Pass a larger `barStride` prop for chunkier
// bars (e.g. compact track cards).
const DEFAULT_BAR_STRIDE = 3;
const PLACEHOLDER_POOL_SIZE = 600;

class WaveformSeek extends React.Component {
  constructor(props) {
    super(props);
    this.waveformRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    // Generate a stable placeholder pool once; it is resampled to the
    // measured bar count so bars don't re-randomize on resize/render.
    this.placeholderPool = Array.from(
      { length: PLACEHOLDER_POOL_SIZE },
      () => Math.random() * 0.8 + 0.2
    );
    this.state = { barCount: 100 };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.barStride !== this.props.barStride) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const el = this.waveformRef.current;
    if (!el) return;
    const stride = this.props.barStride || DEFAULT_BAR_STRIDE;
    const barCount = Math.max(40, Math.floor(el.clientWidth / stride));
    if (barCount !== this.state.barCount) {
      this.setState({ barCount });
    }
  }

  // Resample source amplitudes to the target bar count so density follows
  // the container width instead of stretching a fixed number of bars.
  resample(source, count) {
    if (source.length === count) return source;
    return Array.from({ length: count }, (_, i) => {
      const idx = Math.floor((i / count) * source.length);
      return source[idx];
    });
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
    const { barCount } = this.state;

    // If we have actual waveform data, use it; otherwise use stable placeholder
    const source = waveformData || this.placeholderPool;
    const bars = this.resample(source, barCount);

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

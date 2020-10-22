import WaveSurfer from "wavesurfer.js";
import { updateSong } from "../actions/song_actions";

export const initWave = container => {
  let wave = WaveSurfer.create({
    // container param takes in an element ID, so needs a # in front
      container: `#${container}`,
      backend: "MediaElement",
      height: 100,
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      progressColor: "#f50",
      cursorColor: "rgba(255, 0, 0, 0.0)",
      fillParent: true,
      minPxPerSec: 10,
      barMinHeight: 1,
      interact: false,
      responsive: true,
    });
  wave.setMute(true);
  return wave;
}

export const seekWave = (waveData, wave, pos) => {
  if (!waveData.selected) {
    waveData.selected = true
    // make wave interactive
  } else {
    waveData.localSeek = true;
  }
}

export const makeInteractive = (waveData, wave, pos) => {
}

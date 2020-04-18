// import React from "react";

// class WaveForm extends React.Component {
//   constructor(props) {
//     super(props);
//     window.AudioContext = window.AudioContext || window.webkitAudioContext;
//     this.audioContext = new AudioContext();
//     this.currentBuffer = null;
//     this.visualizeAudio(props.url)
//   }

//   visualizeAudio(url) {
//     // debugger
//     fetch(url)
//       .then(res => res.arrayBuffer())
//       // .then((audioBuffer) => window.test = audioBuffer)
//       .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
//       .then(audioBuffer => this.draw(this.normalizeData(this.filterData(audioBuffer))));
//   }

//   filterData(audioBuffer) {
//     const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
//     const samples = 70; // Number of samples we want to have in our final data set
//     const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
//     const filteredData = [];
//     for (let i = 0; i < samples; i++) {
//       let blockStart = blockSize * i; // the location of the first sample in the block
//       let sum = 0;
//       for (let j = 0; j < blockSize; j++) {
//         sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
//       }
//       filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
//     }
//     return filteredData;
//   }

//   normalizeData(filteredData) {
//     const multiplier = Math.pow(Math.max(...filteredData), -1);
//     return filteredData.map(n => n * multiplier);
//   }
  

//   draw(normalizedData) {
//     // Set up the canvas
//     const canvas = document.getElementById("waveform-canvas");
//     const dpr = window.devicePixelRatio || 1;
//     const padding = 20;
//     canvas.width = canvas.offsetWidth * dpr;
//     canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
//     const ctx = canvas.getContext("2d");
//     ctx.scale(dpr, dpr);
//     ctx.translate(0, canvas.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas
//     const width = canvas.offsetWidth / normalizedData.length;
//     for (let i = 0; i < normalizedData.length; i++) {
//       const x = width * i;
//       let height = normalizedData[i] * canvas.offsetHeight - padding;
//       if (height < 0) {
//         height = 0;
//       } else if (height > canvas.offsetHeight / 2) {
//         height = height > canvas.offsetHeight / 2;
//       }
//       this.drawLineSegment(ctx, x, height, width, (i + 1) % 2);
//     }
//   };

//   drawLineSegment(ctx, x, y, width, isEven) {
//     ctx.lineWidth = 1; // how thick the line is
//     ctx.strokeStyle = "#000000"; // what color our line is
//     ctx.beginPath();
//     y = isEven ? y : -y;
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, y);
//     ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
//     ctx.lineTo(x + width, 0);
//     ctx.stroke();
//   };

//   render(){
//     return(
//       <div>wave</div>
//     )
//   }
// }

// export default WaveForm;
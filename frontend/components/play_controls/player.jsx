import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div>
        <div>PLAY/PAUSE</div>
        <progress></progress>
      </div>
    );
  }
}

export default Player;
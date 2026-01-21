import React from "react";

class HeroSection extends React.Component {
  render() {
    // TODO: Fetch featured playlist from backend
    const featuredPlaylist = {
      title: "Featured Playlist",
      subtitle: "Top tracks this week",
      imageUrl: null, // Can use blurred artwork later
    };

    return (
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">{featuredPlaylist.title}</h2>
          <p className="hero-subtitle">{featuredPlaylist.subtitle}</p>
          <button className="hero-cta">
            Play all
          </button>
        </div>
      </div>
    );
  }
}

export default HeroSection;

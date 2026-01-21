import React from "react";
import HeroSection from "../splash/hero_section";
import GenreFilters from "../splash/genre_filters";
import TrackCardV3Container from "../songs/track_card_v3_container";
import MiniPlayerContainer from "../player/mini_player_container";

class SplashV3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: "All",
    };
  }

  componentDidMount() {
    this.props.fetchSongs();
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const { songs } = this.props;
    const { selectedGenre } = this.state;

    if (songs.length === 0) return null;

    // Filter songs by genre if needed
    const filteredSongs = selectedGenre === "All" 
      ? songs 
      : songs; // TODO: Add genre filtering when we have genre data

    return (
      <div className="splash-v3">
        <HeroSection />
        
        <div className="splash-v3-content">
          <GenreFilters 
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
          
          <div className="track-list-v3">
            {filteredSongs.map((song) => (
              <TrackCardV3Container
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </div>

        <MiniPlayerContainer />
      </div>
    );
  }
}

export default SplashV3;

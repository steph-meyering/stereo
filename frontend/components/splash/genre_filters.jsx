import React from "react";

class GenreFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGenre: "All",
    };
  }

  handleFilterClick(genre) {
    this.setState({ activeGenre: genre });
    if (this.props.onFilterChange) {
      this.props.onFilterChange(genre);
    }
  }

  render() {
    const genres = ["All", "Lo-fi", "Indie", "Hip-hop", "Electronic", "Jazz"];
    const { activeGenre } = this.state;

    return (
      <div className="genre-filters-container">
        <h2 className="genre-filters-title">Trending</h2>
        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
              onClick={() => this.handleFilterClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default GenreFilters;

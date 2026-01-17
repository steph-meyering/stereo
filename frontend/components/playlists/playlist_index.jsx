import React from "react";

class PlaylistIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPlaylists();
  }

  render() {
    const playlists = Object.values(this.props.playlists || {});
    return (
      <div className="playlist-index">
        <h2>Playlists</h2>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <strong>{playlist.title}</strong> · {playlist.owner}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlaylistIndex;

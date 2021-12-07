import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import PlaylistList from '../PlaylistList/PlaylistList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      playlistId: null,
      playlistList: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.getUserPlayLists = this.getUserPlayLists.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let songInPlaylist = false;
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (track.id === this.state.playlistTracks[i].id) {
        songInPlaylist = true;
      }
    }
    if (!songInPlaylist) {
      const newPlaylist = this.state.playlistTracks.concat();
      newPlaylist.push(track);
      this.setState({ playlistTracks: newPlaylist });
    }
  }

  removeTrack(track) {
    const newPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
    this.setState({ playlistTracks: newPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris)
      .then(() => this.getUserPlayLists());
    this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
  }

  deletePlaylist(playlist) {
    Spotify.deletePlaylistById(playlist.playlistId)
      .then(() => this.getUserPlayLists());
  }

  getUserPlayLists() {
    Spotify.getUserPlayLists()
      .then(playlists => this.setState({ playlistList: playlists }));
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(tracks => this.setState({ searchResults: tracks }));
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
          <PlaylistList
            getUserPlayLists={this.getUserPlayLists}
            playlistList={this.state.playlistList}
            deletePlaylist={this.deletePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;

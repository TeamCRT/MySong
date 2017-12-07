import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import Playlist from './Playlist';

// testPlaylistArray is an array of objects, where
// each object has properties spotifyID, URI, playlistName, and perhaps the songs


class PlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };

    this.mapFunction = playlistObj => (
      <Playlist
        title={playlistObj.playlistName}
        key={playlistObj.spotifyID}
        // onClick={playlist click handler function written in homepage}
      />
    );
    // query the database for the names of user's playlists
    axios.get('/api/playlists')
      .then((response) => {
        this.setState({ playlists: response.data[0].playlists });
        return response;
      })
      .catch(err => err);
  }

  render() {
    return (
      <div style={{ float: 'left' }}>
        <Button.Group vertical >
          <Button disabled >My Playlists</Button>
          {this.state.playlists.map(this.mapFunction)}
          <Button color="red">Create</Button>
        </Button.Group>
      </div>
    );
  }
}

export default PlaylistsContainer;

import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import PlaylistEntry from './PlaylistEntry';

// testPlaylistArray is an array of objects, where
// each object has properties spotifyID, URI, playlistName, and perhaps the songs


class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };

    axios.get('/api/playlists')
      .then((response) => {
        this.setState({ playlists: response.data[0].playlists });
        return response;
      })
      .catch(err => err);
  }

  mapFunction(playlistObj) {
    return (
      <PlaylistEntry
        title={playlistObj.playlistName}
        key={playlistObj.spotifyPlaylistID}
        spotifyPlaylistID={playlistObj.spotifyPlaylistID}
        clickHandler={this.props.clickHandler}
      />
    );
  }

  render() {
    return (
      <div style={{ float: 'left' }}>
        <Button.Group vertical >
          <Button disabled >My Playlists</Button>
          {this.state.playlists.map(this.mapFunction.bind(this))}
          <Button color="red">Create</Button>
        </Button.Group>
      </div>
    );
  }
}

export default PlaylistContainer;

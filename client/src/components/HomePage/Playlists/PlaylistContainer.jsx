/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'semantic-ui-react';
import PlaylistEntry from './PlaylistEntry';
import CreatePlaylistModal from './CreatePlaylistModal';

class PlaylistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.mapFunction = this.mapFunction.bind(this);
  }

  mapFunction(playlistObj) {
    return (
      <PlaylistEntry
        name={playlistObj.playlistName}
        key={playlistObj.playlistName}
        spotifyPlaylistID={playlistObj.spotifyPlaylistID}
        spotifyPlaylistURI={playlistObj.spotifyPlaylistURI}
        clickHandler={this.props.clickHandler}
      />
    );
  }

  render() {
    return (
      <div>

        <div>
          <Button.Group vertical style={{ width: '100%' }}>
            <Button disabled >My Playlists</Button>
            {this.props.playlists.map(this.mapFunction)}
            <CreatePlaylistModal
              spotifyId={this.props.spotifyId}
              color="red"
              following={this.props.following}
              updatePlaylists={this.props.updatePlaylists}
              playlists = {this.props.playlists}
              refreshFollowing={this.props.refreshFollowing}
            />
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default PlaylistContainer;

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
      <div id="playlist-container">
        <div id="my-playlists">My Playlists</div>
        <div id="playlist-list">
          <Button.Group vertical style={{ width: '100%' }}>
            {this.props.playlists.map(this.mapFunction)}
          </Button.Group>
        </div>
        <CreatePlaylistModal
          spotifyId={this.props.spotifyId}
          color="red"
          following={this.props.following}
          updatePlaylists={this.props.updatePlaylists}
          playlists={this.props.playlists}
          refreshFollowing={this.props.refreshFollowing}
          view={this.props.view}
        />
      </div>
    );
  }
}

export default PlaylistContainer;

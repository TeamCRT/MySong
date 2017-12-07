import React from 'react';
import { Button } from 'semantic-ui-react';
import Playlist from './Playlist';

// testPlaylistArray is an array of objects, where
// each object has properties spotifyID, URI, playlistName, and perhaps the songs


class PlaylistsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.testPlaylistArray = [
      {
        playlistName: 'First Playlist',
        spotifyID: 'IDString',
        spotifyURI: 'URIString',
        songsArray: ['song1ID', 'song2ID'],
      },
      {
        playlistName: 'Second Playlist',
        spotifyID: 'IDString2',
        spotifyURI: 'URIString2',
        songsArray: ['song1ID2', 'song2ID2'],
      },
      {
        playlistName: 'Third Playlist',
        spotifyID: 'IDString3',
        spotifyURI: 'URIString3',
        songsArray: ['song1ID3', 'song2ID3'],
      },
    ];
    this.mapFunction = playlistObj => (
      <Playlist
        title={playlistObj.playlistName}
        key={playlistObj.spotifyURI}
        // onClick={playlist click handler function written in homepage}
      />
    );
  }

  render() {
    return (
      <div style={{ float: 'left' }}>
        <Button.Group vertical >
          <Button disabled >My Playlists</Button>
          {this.testPlaylistArray.map(this.mapFunction)}
          <Button color="red">Create</Button>
        </Button.Group>
      </div>
    );
  }
}

export default PlaylistsContainer;

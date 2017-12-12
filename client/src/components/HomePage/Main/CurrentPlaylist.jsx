import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
// import CurrentPlaylistSong from './CurrentPlaylistSong';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksBySpotifyUserId: null,
    };
  }

  getAPlaylist() {
    axios.get(`/api/aplaylist?spotifyUserId=${this.props.spotifyUserId}&spotifyPlaylistURI=${this.props.currentPlaylistObj.playlistURI}`)
      .then((response) => {
        this.setState({ tracksBySpotifyUserId: response.data[0].playlists[0].songsArray });
        console.log('this.state', this.state);
        return response;
      })
      .catch(err => err);
  }

  render() {
    return (
      <div>
        <button onClick={this.getAPlaylist.bind(this)}>Test getAPlaylist</button>
        <div>{this.state.tracksBySpotifyUserId}</div>
        <Grid
          centered
          columns={3}
          padded
          stackable
          stretched
          style={{ margin: '5.0em' }}
          textAlign="center"
        >
          <Grid.Column color="grey" style={{ width: '100%', textAlign: 'center' }}>
             Current Playlist: {this.props.currentPlaylistObj.title}
          </Grid.Column>
        </Grid>
        <iframe
          title="currentPlaylistIframe"
          src={`https://open.spotify.com/embed?uri=${this.props.currentPlaylistObj.playlistURI}`}
          frameBorder="0"
          height="400"
          width="100%"
        />
      </div>
    )
  }

};

export default CurrentPlaylist;

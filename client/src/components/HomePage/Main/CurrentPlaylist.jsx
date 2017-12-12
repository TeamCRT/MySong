import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
// import CurrentPlaylistSong from './CurrentPlaylistSong';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: null,
    };
  }

  getAPlaylist(spotifyUserId, spotifyPlaylistURI) {
    axios.get(`/api/aplaylist?spotifyUserId=${spotifyUserId}&spotifyPlaylistURI=${spotifyPlaylistURI}`)
      .then((response) => {
        console.log('response from aplaylist', response);
        // this.setState({ tracks: response.data[0].playlists });
        return response;
      })
      .catch(err => err);
  }

  render() {
    return (
      <div>
        <button onClick={this.getAPlaylist('testId', 'testURI')}>Test getAPlaylist</button>
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

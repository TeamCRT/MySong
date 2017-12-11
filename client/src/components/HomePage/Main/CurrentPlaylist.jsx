import React from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import CurrentPlaylistSong from './CurrentPlaylistSong';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: null,
    };

    axios.get('/api/aplaylist')
      .then((response) => {
        console.log('response from aplaylist', response);
        this.setState({ tracks: response.data[0].playlists });
        return response;
      })
      .catch(err => err);
  }

  render() {
    return (
      <div>
        <Grid
          centered
          columns={3}
          padded
          stackable
          stretched
          style={{ margin: '5.0em' }}
          textAlign="center"
        >
          <Grid.Column color="grey" style={{ width: 400 }}>
             Current Playlist: {this.props.currentPlaylistObj.title}
          </Grid.Column>
          <CurrentPlaylistSong />
        </Grid>
        <iframe
          title="bottomPlayerIframe"
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

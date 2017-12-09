import React from 'react';
import { Grid } from 'semantic-ui-react';
import CurrentPlaylistSong from './CurrentPlaylistSong';

const CurrentPlaylist = props => (
  <div>
    <Grid
      centered
      columns={3}
      padded
      stackable
      stretched
      style={{ margin: '5.0em', width: 300 }}
      textAlign="center"
    >
      <Grid.Column color="grey" style={{ width: 400 }}>
         Current Playlist: {props.currentPlaylistObj.title}
      </Grid.Column>
      <CurrentPlaylistSong />
    </Grid>
    <iframe
      title="bottomPlayerIframe"
      src={`https://open.spotify.com/embed?uri=${props.currentPlaylistObj.playlistURI}`}
      frameBorder="0"
      height="400"
    />
  </div>
);

export default CurrentPlaylist;

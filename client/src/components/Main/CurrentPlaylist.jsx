import React from 'react';
import { Grid } from 'semantic-ui-react';
import CurrentPlaylistSong from './CurrentPlaylistSong';

const CurrentPlaylist = () => (
  <Grid
    centered
    columns={3}
    padded
    stackable
    stretched
    style={{ margin: '5.0em', width: 300 }}
    textAlign="middle"
  >
    <Grid.Column color="grey" style={{ width: 400 }}>
       Current Playlist
    </Grid.Column>
    <CurrentPlaylistSong />
    <CurrentPlaylistSong />
    <CurrentPlaylistSong />
    <CurrentPlaylistSong />
    <CurrentPlaylistSong />
  </Grid>
);

export default CurrentPlaylist;

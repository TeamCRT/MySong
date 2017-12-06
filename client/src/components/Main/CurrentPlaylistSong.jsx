import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const CurrentPlaylistSong = () => (

  <Grid.Column color="red" style={{ width: 400 }}>
    <Button.Group content="CurrentPlaylistSong">
      <Button icon="play" />
      <Button icon="pause" />
      <Button icon="shuffle" />
    </Button.Group>

  </Grid.Column>
);

export default CurrentPlaylistSong;

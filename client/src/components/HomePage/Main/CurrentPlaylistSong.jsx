import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const CurrentPlaylistSong = () => (

  <Grid.Column color="red" style={{ width: '100%' }}>
    <Button.Group>
      <Button icon="play" />
      <Button icon="pause" />
      <Button icon="shuffle" />
    </Button.Group>

  </Grid.Column>
);

export default CurrentPlaylistSong;

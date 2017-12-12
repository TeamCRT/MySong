import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const CurrentPlaylistSong = (props) => {
  return (
    <Grid.Column color="red" style={{ width: '100%' }}>
      <Button.Group>
        <Button icon="play" />
        <Button icon="pause" />
        <Button>{`${props.user}'s song: ${props.trackObj.trackName} by ${props.trackObj.trackArtist} on the album ${props.trackObj.trackAlbum}. Note: ${props.trackObj.note}`}</Button>
      </Button.Group>

    </Grid.Column>
  );
};

export default CurrentPlaylistSong;

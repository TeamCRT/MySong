import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const CurrentPlaylistSong = props => (
  <Grid>
    <Grid.Column color="red" style={{ width: '15%', borderRadius: '20px 0px 0px 20px', marginBottom: '5px'}}>
      <iframe
        title={`${props.user}Iframe`}
        src={`https://open.spotify.com/embed?uri=spotify:track:${props.trackObj.trackID}`}
        frameBorder="0"
        height="80"
        width="80"
      />
    </Grid.Column>
    <Grid.Column color="red" style={{ width: '85%', borderRadius: '0px 20px 20px 0px', marginBottom: '5px' }}>
      <Button.Group>
        <Button style={{ maxWidth: '100%' }}>
          <h3>{`${props.user}'s song: ${props.trackObj.trackName}`}</h3>
          <div>{`Artist: ${props.trackObj.trackArtist}`}</div>
          <div>{`Album: ${props.trackObj.trackAlbum}`}</div>
          <div>{`Note: ${props.trackObj.note}`}</div>
        </Button>
      </Button.Group>
    </Grid.Column>
  </Grid>
);

export default CurrentPlaylistSong;

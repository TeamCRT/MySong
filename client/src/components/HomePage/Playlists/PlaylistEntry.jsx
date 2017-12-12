import React from 'react';
import { Button } from 'semantic-ui-react';

const PlaylistEntry = props =>
  (
    <Button
      onClick={() => props.clickHandler(props.spotifyPlaylistID, props.spotifyPlaylistURI, props.name)}
    >{props.name}
    </Button>
  );

export default PlaylistEntry;

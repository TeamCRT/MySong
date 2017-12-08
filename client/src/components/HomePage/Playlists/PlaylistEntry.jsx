import React from 'react';
import { Button } from 'semantic-ui-react';

// props received here from PlaylistContainer are:
// title and key (the spotify URI)

const PlaylistEntry = props =>
  (
    <Button
      onClick={() => props.clickHandler(props.spotifyPlaylistID)}
    >{props.title}
    </Button>
  );

export default PlaylistEntry;

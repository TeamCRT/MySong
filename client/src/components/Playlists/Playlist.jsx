import React from 'react';
import { Button } from 'semantic-ui-react';

// props received here from PlaylistContainer are:
// title and key (the spotify URI)

const Playlist = props => <Button>{props.title}</Button>;

export default Playlist;

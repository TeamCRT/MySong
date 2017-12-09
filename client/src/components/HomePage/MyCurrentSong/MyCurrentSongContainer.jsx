import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import MySongModal from './MySongModal';

const MyCurrentSongContainer = (props) => (
  <div>
    <Segment attached="top">
    	<MySongModal spotifyToken={props.spotifyToken} onMySongChange={props.onMySongChange}/>
    </Segment>
  </div>
);

export default MyCurrentSongContainer;

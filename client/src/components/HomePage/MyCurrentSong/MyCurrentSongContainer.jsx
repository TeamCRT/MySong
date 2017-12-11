import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import MySongModal from './MySongModal';

const MyCurrentSongContainer = props => (
  <div>
    <Segment attached="top">
      <Header as="h1" style={{ textAlign: 'center' }}>
        Current My Song is : {props.currentMySong.trackSummary}
        <div style={{ fontSize: '15px' }}>
          Note: {props.currentMySong.note}
        </div>
      </Header>
      <MySongModal
        spotifyId={props.spotifyId}
        spotifyToken={props.spotifyToken}
        onMySongChange={props.onMySongChange} />
    </Segment>
  </div>
);
export default MyCurrentSongContainer;

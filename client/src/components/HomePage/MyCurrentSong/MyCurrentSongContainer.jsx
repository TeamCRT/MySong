/* eslint-disable react/prop-types */
import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import axios from 'axios';
import MySongModal from './MySongModal';
// import stylesheet from 

class MyCurrentSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtworkLink: '',
    };
  }

  render() {
    return (
      <div>
        <Segment attached="top" className='wrapper'>
            <img src={this.props.currentMySong.trackImage300} height='150' style={{position: 'fixed'}} />
          <Header as="h1" style={{ textAlign: 'center' }}>
            Current My Song is : {this.props.currentMySong.trackSummary}
            <div style={{ fontSize: '15px', textAlign: 'center'}}>
              Note: {this.props.currentMySong.note}
            </div>
          </Header>
          <MySongModal
            spotifyId={this.props.spotifyId}
            spotifyToken={this.props.spotifyToken}
            onMySongChange={this.props.onMySongChange}
            currentMySong={this.props.currentMySong}
          />
        </Segment>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

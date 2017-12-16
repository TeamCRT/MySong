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
      albumArtworkLink: null,
    };
  }

  componentDidUpdate() {
    axios({
      method: 'GET',
      url: `/api/spotifyAPI/albumArtwork?trackID=${this.props.currentMySong.trackID}`,
    })
      .then((response) => {
        console.log('response', response)
        this.setState({
          albumArtworkLink: response.data[1].url,
        });
      })
      .catch(err => console.error('err--------------', err));
  }

  render() {
    return (
      <div>
        <Segment attached="top" class='wrapper'>
          {this.state.albumArtworkLink &&
            <img src={this.state.albumArtworkLink} height='150' style={{position: 'static'}} />
          }
          <Header as="h1" style={{ textAlign: 'left' }}>
            Current My Song is : {this.props.currentMySong.trackSummary}
            <div style={{ fontSize: '15px', textAlign: 'left' }}>
              Note: {this.props.currentMySong.note}
            </div>
          </Header>
          <MySongModal
            spotifyId={this.props.spotifyId}
            spotifyToken={this.props.spotifyToken}
            onMySongChange={this.props.onMySongChange}
          />
        </Segment>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

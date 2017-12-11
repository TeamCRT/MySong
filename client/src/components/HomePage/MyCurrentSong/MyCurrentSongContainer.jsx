import React from 'react';
import { Button, Segment, Header } from 'semantic-ui-react';
import MySongModal from './MySongModal';

class MyCurrentSongContainer extends React.Component {
 constructor(props) {
   super(props);
 }
  render() {
    return (
  	  <div>
        <Segment attached="top">
	        <Header as="h1" style={{ textAlign: 'center' }}>
	          Current My Song is : {this.props.currentMySong.trackSummary}
	          <div style={{fontSize:'15px'}}>
	            Note: {this.props.currentMySong.note}
	          </div>
	        </Header>
    	    <MySongModal spotifyId={this.props.spotifyId} spotifyToken={this.props.spotifyToken} onMySongChange={this.props.onMySongChange}/>
        </Segment>
      </div>
  	)
	}

}
export default MyCurrentSongContainer;




/* eslint-disable max-len, no-console */
import React from 'react';
import axios from 'axios';
import MySongModal from './MySongModal';
// import stylesheet from

class MyCurrentSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtworkLink: '',
      wait: false,
      waitTime: null,
      twitter: '',
    };
    this.setWait = this.setWait.bind(this);
  }

  componentDidMount() {
    console.log('component mounted!');
      axios({
          method: 'GET',
          url: '/api/twitter-check',
        })
          .then((response) => {
            let isTwitterConnected = response.data;
            this.setState({twitter: isTwitterConnected});
            console.log(this.state.twitter);
          })
          .catch(err => console.error(err, err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.albumArtworkLink || (prevProps.currentMySong.trackID !== this.props.currentMySong.trackID)) {
      if (this.props.currentMySong.trackID) {
        axios({
          method: 'GET',
          url: `/api/spotifyAPI/albumArtwork?trackID=${this.props.currentMySong.trackID}`,
        })
          .then((response) => {
            this.setState({
              albumArtworkLink: response.data[1].url,
            });
          })
          .catch(err => console.error(err, err));
      }
    }
  }

  setWait(makeWait, waitTime) {
    console.log('setWait is being called', makeWait, waitTime);
    if (makeWait) {
      this.setState({ wait: true, waitTime });
    } else {
      this.setState({ wait: false });
    }
  }

  render() {
    //const twitterConnect = this.state.twitter ? 'url(https://dabuttonfactory.com/button.png?t=disconnect+from+twitter&f=Calibri-Bold&ts=23&tc=fff&w=271&h=50&c=round&bgt=gradient&bgc=9ecbf4&ebgc=3291e8)' : ;
    return (
      <div id="current-song">
        <MySongModal
          spotifyId={this.props.spotifyId}
          spotifyToken={this.props.spotifyToken}
          onMySongChange={this.props.onMySongChange}
          currentMySong={this.props.currentMySong}
          setWait={this.setWait}
        />
        <div className="current-song-info">
          {this.props.currentMySong.trackImage300 && <img className="current-song-artwork" src={this.props.currentMySong.trackImage300} alt="Album Artwork" />}
          <div id="current-song-details">
            <div className="song-title">{this.props.currentMySong.trackName}</div>
            <div className="song-artist">{this.props.currentMySong.trackArtist}</div>
            <div className="song-note">Note: {this.props.currentMySong.note}</div>
            <div style={{ fontSize: '20px', color: 'red' }}>{this.state.wait && (`Wait time remaining: About ${this.state.waitTime} sec(s)`)}</div>
          </div>
        </div>
        {this.state.twitter && (<a 
          style={{
            float: 'right', 
            backgroundImage: 'url(https://dabuttonfactory.com/button.png?t=connect+to+twitter&f=Calibri-Bold&ts=27&tc=fff&w=271&h=50&c=round&bgt=gradient&bgc=9ecbf4&ebgc=3291e8)', 
            padding: '10px 10px 10px 170px', 
            backgroundSize: 'cover',
            marginLeft: '20px',
            height: '50px',
            width: '271px',
            marginLeft: '10px',
            marginBottom: '20px'
          }}
          href="http://127.0.0.1:3001/api/auth/twitter"
        ></a>)}
        {!this.state.twitter && (<a 
          style={{
            float: 'right', 
            backgroundImage: 'url(https://dabuttonfactory.com/button.png?t=disconnect+from+twitter&f=Calibri-Bold&ts=23&tc=fff&w=271&h=50&c=round&bgt=gradient&bgc=9ecbf4&ebgc=3291e8)', 
            padding: '10px 10px 10px 170px', 
            backgroundSize: 'cover',
            marginLeft: '20px',
            height: '50px',
            width: '271px',
            marginLeft: '10px',
            marginBottom: '20px'
          }}
        ></a>)}
      </div>
    );
  }
}

export default MyCurrentSongContainer;

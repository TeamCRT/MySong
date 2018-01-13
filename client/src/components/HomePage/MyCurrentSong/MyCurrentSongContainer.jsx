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
    };
    this.setWait = this.setWait.bind(this);
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
        <a 
          style={{
            float: 'right', 
            backgroundImage: 'url(https://www.inyoursoup.com/images/signup-with-twitter-button@8x.png)', 
            padding: '10px 10px 10px 170px', 
            backgroundSize: 'cover',
            marginLeft: '20px',
            height: '40px',
            width: '200px',
            marginLeft: '10px',
            marginBottom: '20px'
          }}
          href="http://127.0.0.1:3001/api/auth/twitter"
        ></a>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

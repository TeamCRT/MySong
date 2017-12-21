/* eslint-disable max-len, no-console */
import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-clock';
import MySongModal from './MySongModal';
// import stylesheet from

class MyCurrentSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtworkLink: null,
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
          {this.state.albumArtworkLink && <img className="current-song-artwork" src={this.state.albumArtworkLink} alt="Album Artwork" />}
          <div id="current-song-details">
            <div className="song-title">{this.props.currentMySong.trackName}</div>
            <div className="song-artist">{this.props.currentMySong.trackArtist}</div>
            <div className="song-note">Note: {this.props.currentMySong.note}</div>
            <div style={{fontSize: '15px'}}>{this.state.wait && (`Wait time remaining: About ${this.state.waitTime} sec(s)`)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

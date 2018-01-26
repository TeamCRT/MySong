/* eslint-disable max-len, no-console */
import React from 'react';
import axios from 'axios';
import MySongModal from './MySongModal';
import { Button, Popup } from 'semantic-ui-react'

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
    this.disconnectTwitter = this.disconnectTwitter.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
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

  disconnectTwitter() {
    console.log('Disconnect from Twitter');
    axios({
          method: 'GET',
          url: '/api/twitter-disconnect',
        })
          .then((response) => {
            console.log(response);
            this.setState({twitter: false});
          })
          .catch(err => console.error(err, err));
  }

  emailHandler() {
    console.log('Email Handler being called!');
    axios.get(`/api/email`)
      .then((response) => {
        console.log(response);
        alert("YOUR PLAYLISTS HAVE BEEN CRYOGENIZED!");
      })
      .catch(err => err);
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
          twitter={this.state.twitter}
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
        <div style={{display: 'flex', flexDirection:'column'}}>
        <Popup
          position='right center'
          style={{'fontFamily': 'Viga'}}
          trigger={
            <button 
              id='cryogenize'
              onClick={this.emailHandler}
              >Cryogenize
            </button>
          }
          content='Really loving the playlists this week? Preserve a frozen copy for future jam sessions. Click to have all your current playlist information cryogenized and sent to your Spotify email address!'
        />
        {!this.state.twitter && (
          <Popup
            style={{'fontFamily': 'Viga'}}
            position='right center'
            trigger={
              <a id='twitter-connect'
                href="http://127.0.0.1:3001/api/auth/twitter"
              >connect to twitter</a>
            }
            content='Connect your twitter account to enable automatic notification tweets when you change your MySong!'
          />
        )}
        {this.state.twitter && (
          <Popup
            style={{'fontFamily': 'Viga'}}
            position='right center'
            trigger={
              <a id='twitter-disconnect'
                onClick={this.disconnectTwitter}
              >disconnect twitter</a>
            }
            content='Disconnect your twitter account. Automatic MySong notification tweets will be disabled.'
          />
        )}
      </div>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

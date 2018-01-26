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
          trigger={
            <button 
              style={{
                width: '140px',
                height: '40px',
                margin: '10px 10px 10px 20px',
                borderRadius: '100px',
                fontFamily:'Bungee',
                color: 'white',
                background: 'radial-gradient(#59304c, #25131f)',
                cursor: 'pointer'
              }}
              onClick={this.emailHandler}
              >Cryogenize
            </button>
          }
          content='Cryogenize Feature: Really loving the playlists this week? Want to preserve a copy of it for future jam sessions? Click to have all your current playlist information cryogenized and sent to your Spotify email address!'
        />
        {!this.state.twitter && (
          <Popup
            trigger={
              <a 
                style={{
                  width: '140px',
                  height: '55px',
                  margin: '0px 10px 10px 20px',
                  borderRadius: '200px',
                  fontFamily:'Bungee',
                  color: 'white',
                  background: 'radial-gradient(#54703b, #2b2c2d)',
                  textAlign: 'center',
                  paddingTop: '9px',
                  cursor: 'pointer'
                }}
                href="http://127.0.0.1:3001/api/auth/twitter"
              >connect to twitter</a>
            }
            content='Connect your twitter account to have an automatic notification tweet sent to your followers whenever you change your MySong!'
          />
        )}
        {this.state.twitter && (
          <Popup
            trigger={
              <a 
                style={{
                  width: '140px',
                  height: '55px',
                  margin: '0px 10px 10px 20px',
                  borderRadius: '200px',
                  fontFamily:'Bungee',
                  color: 'white',
                  background: 'radial-gradient(#54575b, #2b2c2d)',
                  textAlign: 'center',
                  paddingTop: '9px',
                  cursor: 'pointer'
                }}
                onClick={this.disconnectTwitter}
              >disconnect twitter</a>
            }
            content='Disconnect your twitter account. Automatic notification tweets to your followers when you change your MySong will be disabled.'
          />
        )}
      </div>
      </div>
    );
  }
}

export default MyCurrentSongContainer;

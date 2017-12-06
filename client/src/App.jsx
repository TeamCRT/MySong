import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
// var querystring = require('querystring');
// require('dotenv').config({ path: '../env.env' });


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Ross',
      password: 'RossPsw',
    };
    this.handleSignup = (e) => {
      console.log('HandleRegisterSubmit called');
      e.preventDefault();
      // Axios post handled in server/api/index.js
      axios.get('/api/auth/spotify')
        .then((response) => {
          console.log('api/signup response: ', response.data);
        })
        .catch(error => console.log('handleRegisterSubmitError: ', error));
    };

    this.getLoggedInUser = () => {
      axios.get('/api/me')
        .then(() => {
          console.log('successful axios call to /api/me');
          // this.setState({
          //   currentUser: user.data
          // })
        })
        .catch(error => console.log('handleMeError: ', error));
    };
  }
  componentWillMount() {
    this.getLoggedInUser();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {/* <a href={'https://accounts.spotify.com/authorize?' + querystring.stringify({
              response_type: 'code',
              client_id: 'b566bb55b1154c989dd684b0b32d0359',
              scope: 'user-read-private user-read-email',
              redirect_uri: 'http://localhost:3001/api/callback',
              state: '013747suhqlxJA73'
            })} >Go to http://3001/api/me </a> */}
          <a href="http://127.0.0.1:3001/api/auth/spotify/" > Spotify OAuth </a>
          <button onClick={this.handleSignup}>
            Using handleSignup to call /api/auth/spotify
          </button>
        </div>
        <p className="App-intro">
          This is a test.
        </p>
      </div>
    );
  }
}

export default App;

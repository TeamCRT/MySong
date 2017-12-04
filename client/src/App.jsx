import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Ross',
      password: 'RossPsw',
    };
    this.handleRegisterSubmit = (e) => {
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
          <button onClick={this.handleRegisterSubmit} > Make a call to /api/signup </button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

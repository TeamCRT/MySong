import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Ross',
      password: 'Ross',
    };
    this.handleRegisterSubmit = (e) => {
      console.log('HandleRegisterSubmit called');
      e.preventDefault();
      // Axios post handled in server/api/index.js
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password,
      })
        .then((response) => {
          console.log('api/signup response: ', response);
        // if(response.data) {
        //   this.props.setCurrentUser(response.data);
        //   this.setState({open: false});
        //   if (this.props.history.location.pathname === '/'){
        //     this.props.history.push('/'+this.state.username)
        //   }
        // } else {
        //   console.log(response);
        // }
        })
        .catch(error => console.log('handleRegisterSubmitError: ', error));
    };

    this.getLoggedInUser = () => {
      axios.get('/api/me')
        .then(() => {
          alert('GOT ME');
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

import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.svg';
import NavBarContainer from './NavBar/NavBarContainer.jsx';
import HomePage from './HomePage/HomePage';
import 'semantic-ui-css/semantic.min.css';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


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
          //alert('GOT ME');
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
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={NavBarContainer} />
        </div>
      </Router>
    );
  }

}

export default App;

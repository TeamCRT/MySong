import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.svg';
import HomePage from './HomePage/HomePage';
import LandingPage from './LandingPage/LandingPage';
import 'semantic-ui-css/semantic.min.css';
// import logo from '../images/logo.svg';
import NavBarContainer from './NavBar/NavBarContainer';
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
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home/:username" component={HomePage} />
        </div>
      </Router>
    );
  }

}

export default App;

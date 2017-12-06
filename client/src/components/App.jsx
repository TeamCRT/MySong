import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
// import logo from '../images/logo.svg';
import NavBarContainer from './NavBar/NavBarContainer';
import HomePage from './HomePage/HomePage';
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
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={NavBarContainer} />
        </div>
      </Router>
    );
  }

}

export default App;

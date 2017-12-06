import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
// import logo from '../images/logo.svg';
import NavBarContainer from './NavBar/NavBarContainer';
import HomePage from './HomePage/HomePage';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <HomePage />
      </div>
    );
  }
}

export default App;

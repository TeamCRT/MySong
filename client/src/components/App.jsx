import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import createHistory from 'history/createBrowserHistory';
import HomePage from './HomePage/HomePage';
import LandingPage from './LandingPage/LandingPage';
import '../styles/App.css';

const history = createHistory();

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
          <Route exact path="/home/*" history={history} component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;

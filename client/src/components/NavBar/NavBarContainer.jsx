import React from 'react';
import { Button, Menu, Header } from 'semantic-ui-react';
import Search from './Search.jsx'
import './NavBarContainer.css';


class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    window.localStorage.removeItem('token');
  }
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Search options={this.props.options} />
        </Menu.Item>
        <Header size="large" color="red" style={{fontFamily:'Bungee', fontSize:'50px', marginLeft:'11em'}} floated="right">mysong.io </Header>
        <Menu.Item name={this.props.username} position="right" />
        <Menu.Item>
          <Button onClick={this.handleLogOut}> Log Out </Button>
        </Menu.Item>
      </Menu>
    );
  }
};

export default NavBarContainer;

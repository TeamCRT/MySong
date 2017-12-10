import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Search from './Search.jsx'
import './NavBarContainer.css';


const NavBarContainer = props => (
  <Menu>
    <Menu.Item>
      <Search options={props.options} />
    </Menu.Item>
    <Header size="large" color="red" floated="right">mysong.io </Header>
    <Menu.Item name={props.username} position="right" />
  </Menu>
);

export default NavBarContainer;

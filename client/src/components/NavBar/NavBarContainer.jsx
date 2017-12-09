import React from 'react';
import { Input, Menu, Header } from 'semantic-ui-react';
import './NavBarContainer.css';


const NavBarContainer = (props) => (
  <Menu>
    <Menu.Item>
      <Input className="icon" icon="search" placeholder="Search for user" />
    </Menu.Item>

    <Header size="large" color="red" floated="right">mysong.io </Header>
    <Menu.Item name={props.username} position="right" />
  </Menu>
);

export default NavBarContainer;

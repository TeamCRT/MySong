import React from 'react';
import { Dropdown, Input, Menu, Header } from 'semantic-ui-react';
import Search from './Search.jsx'
import './NavBarContainer.css';


class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);

  }
  render(props){
    // console.log('NAVBAR PROPS', this.props);
    return (
      <Menu>
        <Menu.Item>
          <Search options={this.props.options} />
        </Menu.Item>
        <Header size="large" color="red" floated="right">mysong.io </Header>
        <Menu.Item name={this.props.username} position="right" />
      </Menu>
    );
  }
}

export default NavBarContainer;

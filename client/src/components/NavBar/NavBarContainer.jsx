import React from 'react'
import { Input, Menu, Header } from 'semantic-ui-react'

const NavBarContainer = () => (
  <Menu>
    <Menu.Item>
      <Input className='icon' icon='search' placeholder='Search for user' />
    </Menu.Item>

    <Header size='large' color='red' floated='right'>mysong.io </Header>

    <Menu.Item name='John Doe' position='right'>
      
    </Menu.Item>
  </Menu>
)

export default NavBarContainer
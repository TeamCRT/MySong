import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import Playlist from './Playlist.jsx';

const PlaylistsContainer = () => (

  <div style={{float:'left'}}>
  <Button.Group vertical >
  	<Button disabled='true' >My Playlists</Button>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Playlist/>
    <Button color='red'>Create</Button>
  </Button.Group>
  </div>
)

export default PlaylistsContainer
// import React from 'react'
// import { Button, Header, Segment} from 'semantic-ui-react'
// import Playlist from '../Playlists/PlaylistsContainer.jsx';

// const MainContainer = () => (
//   <div style={{float:'left'}}>
//   <Segment.Group vertical >
//   	<Segment size='huge'>You should see this here</Segment>
  	
//   </Segment.Group>
//   </div>
// )

// export default MainContainer


import React from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'
import CurrentPlaylist from './CurrentPlaylist.jsx';


const MainContainer = () => (
      <div>
        <CurrentPlaylist />
      </div>
)

export default MainContainer





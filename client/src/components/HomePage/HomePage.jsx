// import React from 'react';
// import { Button } from 'semantic-ui-react';
// import MyCurrentSongContainer from '../MyCurrentSong/MyCurrentSongContainer.jsx';
import PlaylistsContainer from '../Playlists/PlaylistsContainer.jsx';
import MainContainer from '../Main/MainContainer.jsx';
import FollowingContainer from '../Following/FollowingContainer.jsx';

// import { Container, Divider } from 'semantic-ui-react'

// const HomePage = () => (
// <Container>
//     <MyCurrentSongContainer />
//   <Container>
//     <PlaylistsContainer />

//     <Divider />

//     <MainContainer />

//     <Divider />

//     <FollowingContainer />
//   </Container>
// </Container>
// )

// export default HomePage
//    // <MyCurrentSongContainer />
//    // <PlaylistsContainer />
//    // <MainContainer />
//    // <FollowingContainer />
import React from 'react'
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'

const HomePage = () => (
  <Container style={{ marginTop: '3em' }}>
    <Header as='h1'>my song for the week is: Remember Me</Header>
    <Divider />
    <Grid columns={3} stackable>
      <Grid.Column>
        <PlaylistsContainer/>
      </Grid.Column>

      <Grid.Column>
        <Header as='h1'>Main View</Header>
        <MainContainer />
      </Grid.Column>

      <Grid.Column>
        <FollowingContainer />
      </Grid.Column>

    </Grid>
  </Container>
)

export default HomePage


import React from 'react';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import PlaylistsContainer from '../Playlists/PlaylistsContainer';
import MainContainer from '../Main/MainContainer';
import FollowingContainer from '../Following/FollowingContainer';
import BottomPlayer from './BottomPlayer';


const HomePage = () => (
  <Container style={{ marginTop: '3em', width: '100%' }}>
    <Header as="h1" style={{ textAlign: 'center' }}>
      My Current Song: Remember Me
    </Header>
    <Divider />
    <Grid columns={3} stackable>
      <Grid.Column>
        <PlaylistsContainer />
      </Grid.Column>

      <Grid.Column>
        <Header as="h1">Main View</Header>
        <MainContainer />
      </Grid.Column>

      <Grid.Column>
        <FollowingContainer />
      </Grid.Column>

    </Grid>
    <BottomPlayer />
  </Container>
);

export default HomePage;

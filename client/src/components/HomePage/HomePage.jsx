import React from 'react';
import axios from 'axios';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import PlaylistContainer from './Playlists/PlaylistContainer';
import MainContainer from './Main/MainContainer';
import FollowingContainer from './Following/FollowingContainer';
import BottomPlayer from './BottomPlayer';
import NavBarContainer from '../NavBar/NavBarContainer';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    };
  }

  componentDidMount() {
    axios('/api/getUser')
      .then((user) => {
        this.setState({currentUser:user});
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <Container style={{ marginTop: '3em', width: '100%' }}>
          <Header as="h1" style={{ textAlign: 'center' }}>
            My Current Song: Remember Me
          </Header>
          <Divider />
          <Grid columns={3} stackable>
            <Grid.Column>
              <PlaylistContainer />
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
      </div>
    );
  }
}

export default HomePage;

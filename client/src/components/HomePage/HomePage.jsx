import React from 'react';
import axios from 'axios';
import { Container, Divider, Grid, Header } from 'semantic-ui-react';
import PlaylistContainer from './Playlists/PlaylistContainer';
import MainContainer from './Main/MainContainer';
import FollowingContainer from './Following/FollowingContainer';
import BottomPlayer from './BottomPlayer';
import NavBarContainer from '../NavBar/NavBarContainer';
import MyCurrentSongContainer from './MyCurrentSong/MyCurrentSongContainer';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      spotifyDisplayName: '',
      spotifyId: null,
      spotifyRefreshToken: '',
      spotifyToken:'',
      spotifyUsername:'',
      currentPlaylist: null,
      currentMySong:{
        trackSummary: 'Tiny Dancer by Elton John',
        trackID: '4BGJSbB5rAcg4pNzD4gfxU',
        note: 'I love this song',
      },
      currentPlaylistObj: {},
    };
    this.handleMySongChange = this.handleMySongChange.bind(this);
  }

  componentWillMount() {
    const token = window.location.href.split('=')[1]; // eslint-disable-line
    window.localStorage.token = token; // eslint-disable-line
    axios.defaults.headers.common.jwt = window.localStorage.token; // eslint-disable-line
    if (window.localStorage.token) { // eslint-disable-line
      axios.get('/api/me')
        .then((res) => {
          this.setState({
            spotifyDisplayName: res.data.spotifyDisplayName,
            spotifyId: res.data.spotifyId,
            spotifyRefreshToken: res.data.spotifyRefreshToken,
            spotifyToken: res.data.spotifyToken,
            spotifyUsername: res.data.spotifyUsername,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handlePlaylistEntryClick(playlistID, playlistURI, title) {
    this.setState({
      currentPlaylistObj: {
        playlistID,
        playlistURI,
        title,
      },
    });
  }

  handleFollowingClick() {
    console.log('HANDLE FOLLOWING CLICK');
  }

  handleMySongChange(mySong) {
    this.setState({ currentMySong: mySong });
  }

  render() {
    return (
      <div>
        <NavBarContainer username={this.state.spotifyUsername} />
        <Container style={{ marginTop: '3em', width: '100%' }}>
          <Header as="h1" style={{ textAlign: 'center' }}>
            Current My Song is : {this.state.currentMySong.trackSummary}
          <div style={{fontSize:'15px'}}>
            Note: {this.state.currentMySong.note}
          </div>
            <MyCurrentSongContainer
              spotifyToken={this.state.spotifyToken}
              onMySongChange={this.handleMySongChange}
            />
          </Header>
          <Divider />
          <Grid columns={3} stackable>
            <Grid.Column>
              <PlaylistContainer clickHandler={this.handlePlaylistEntryClick.bind(this)} />
            </Grid.Column>

            <Grid.Column>
              {this.state.currentPlaylistObj.title && (
                <MainContainer
                  currentPlaylistObj={this.state.currentPlaylistObj}
                />
              )}
            </Grid.Column>

            <Grid.Column>
              {this.state.spotifyId && ( <FollowingContainer
                spotifyId={this.state.spotifyId}
              /> ) }
            </Grid.Column>

          </Grid>
          <BottomPlayer />
        </Container>
      </div>
    );
  }
}

export default HomePage;

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
      test:'',
      currentMySong:{
        trackSummary:'', 
        trackID: '', 
        trackAlbum: '',
        trackName:'',
        trackArtist:'',
        note:'',
      },
      currentPlaylistObj: {},
      }
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
        .then((res) => {

          axios.get(`/api/currentmysong/${this.state.spotifyId}`)
            .then((res) => {
              console.log('axios call to /api/currentmysong!');
              console.log('current song queried from database is ', res.data[0].currentMySong);
              this.setState({
                currentMySong:res.data[0].currentMySong
              });
              console.log('this.state.currentMySong is ', this.state.currentMySong);
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
            <MyCurrentSongContainer currentMySong={this.state.currentMySong} spotifyId={this.state.spotifyId} spotifyToken={this.state.spotifyToken} onMySongChange={this.handleMySongChange}/>
          <Divider />
          <Grid columns={3} stackable>
            <Grid.Column>
              <PlaylistContainer
                clickHandler={this.handlePlaylistEntryClick.bind(this)}
                spotifyId={this.state.spotifyId}
              />
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

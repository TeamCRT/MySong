import React from 'react';
import axios from 'axios';
import { Container, Divider, Grid } from 'semantic-ui-react';
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
      options: '',
      currentUser: '',
      spotifyDisplayName: '',
      spotifyId: null,
      spotifyRefreshToken: '',
      spotifyToken: '',
      spotifyUsername: '',
      currentPlaylist: null,
      currentMySong:{
        trackSummary: '',
        trackID: '',
        trackAlbum: '',
        trackName: '',
        trackArtist: '',
        note: '',
      },
      currentPlaylistObj: {},
      songToPlay: {
        trackID: null,
      }
    };
    this.handleMySongChange = this.handleMySongChange.bind(this);
    this.playFollowingTrack = this.playFollowingTrack.bind(this);
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
              this.setState({
                currentMySong:res.data[0].currentMySong
              });
            });

        })
        .catch((err) => {
          console.log(err);
        });
        axios.post('/api/getAllUsers', { query: '' })
        .then((results) => {
          // console.log('SEARCH RESULTS: ', results.data);
          // this.setOptions(results.data)
          const formatOptions = [];
          results.data.forEach((result) => {
            const formatResult = {};
            formatResult.title = result.mySongUsername;
            formatResult.key = result._id; // eslint-disable-line
            // the i in spotifyid is not capitalized to avoid an error
            formatResult.spotifyid = result.spotifyId;
            formatOptions.push(formatResult);
          });
          this.setState({ options: formatOptions });
        })
        .catch((err) => {
          throw err;
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

  handleMySongChange(mySong) {
    this.setState({ currentMySong: mySong });
  }

  playFollowingTrack(trackID) {
    this.setState({
      songToPlay: {
        trackID,
      },
    });
  }

  render() {
    return (
      <div>
        <NavBarContainer options={this.state.options} username={this.state.spotifyUsername} style={{border:'10px'}} />
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
                  spotifyUserId={this.state.spotifyId}
                />
              )}
            </Grid.Column>

            <Grid.Column>
              {this.state.spotifyId && ( <FollowingContainer
                spotifyId={this.state.spotifyId}
                playFollowingTrack={this.playFollowingTrack}
              /> ) }
            </Grid.Column>

          </Grid>
          {this.state.songToPlay.trackID ?
            <BottomPlayer URI={`spotify:track:${this.state.songToPlay.trackID}`} /> :
            <BottomPlayer URI={`spotify:track:${this.state.currentMySong.trackID}`} />
          }
        </Container>
      </div>
    );
  }
}

export default HomePage;

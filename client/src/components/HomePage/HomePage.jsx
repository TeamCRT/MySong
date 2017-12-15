import React from 'react';
import axios from 'axios';
import { Container, Divider, Grid } from 'semantic-ui-react';
import PlaylistContainer from './Playlists/PlaylistContainer';
import CurrentPlaylist from './Main/CurrentPlaylist';
import FollowingContainer from './Following/FollowingContainer';
import BottomPlayer from './BottomPlayer';
import NavBarContainer from '../NavBar/NavBarContainer';
import MyCurrentSongContainer from './MyCurrentSong/MyCurrentSongContainer';


// const HOME = 'http://127.0.0.1:3000/home/'
let refreshFollowing = false;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: '',
      currentUser: '',
      mySongUsername: '',
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
      },
    };
    this.handleMySongChange = this.handleMySongChange.bind(this);
    this.playFollowingTrack = this.playFollowingTrack.bind(this);
    this.handleMySongChange = this.handleMySongChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleFollowingRefresh = this.handleFollowingRefresh.bind(this);
  }

  componentDidMount() {
    axios.get('/api/me')
      .then((res) => {
        const user = res.data.passport.user;
        console.log('USER Session: ', user);
        this.setState({
          mySongUsername: user.mySongUsername,
          spotifyDisplayName: user.spotifyDisplayName,
          spotifyId: user.spotifyId,
          spotifyRefreshToken: user.spotifyRefreshToken,
          spotifyToken: user.spotifyToken,
          spotifyUsername: user.spotifyUsername,
          currentMySong: user.currentMySong,
          following: user.following,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/getAllUsers')
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

  handleFollowingRefresh() {
    axios.get('/api/me')
      .then((res) => {
        const user = res.data.passport.user;
        this.setState({
          following: user.following,
        });
        console.log('SET THE FOLLOWING STATE: ', user);
      });
  }

  handlePlaylistEntryClick(playlistID, playlistURI, name) {
    this.setState({
      currentPlaylistObj: {
        playlistID,
        playlistURI,
        name,
      },
    });
  }

  handleMySongChange(mySong) {
    this.setState({ currentMySong: mySong });
  }

  handleRemoveFollow(spotifyId) {
    console.log('REMOVE FOLLLOW', spotifyId);
    // axios.delete('/api/removeFollow', {spotifyId})
    //   .then((following) => {
    //     console.log('New following: ', following);
    //   })
  }

  playFollowingTrack(trackID) {
    this.setState({
      songToPlay: {
        trackID,
      },
    });
  }

  newPlaylistHandleClick() {
    console.log('Nothing to see here boiiis');
  }

  render() {
    return (
      <div>
        <NavBarContainer refreshFollowing={this.handleFollowingRefresh} history={this.props.history} options={this.state.options} username={this.state.mySongUsername} style={{ border: '10px' }} />
        <Container style={{ marginTop: '3em', width: '100%' }}>
          <MyCurrentSongContainer
            currentMySong={this.state.currentMySong}
            spotifyId={this.state.spotifyId}
            spotifyToken={this.state.spotifyToken}
            onMySongChange={this.handleMySongChange}
          />
          <Divider />
          <Grid columns={3} stackable>
            <Grid.Column style={{ width: '20%' }}>
              {this.state.spotifyId && (<PlaylistContainer
                clickHandler={this.handlePlaylistEntryClick.bind(this)}
                spotifyId={this.state.spotifyId}
              />)}
            </Grid.Column>

            <Grid.Column style={{ width: '60%' }}>
              {this.state.currentPlaylistObj.name && (
                <CurrentPlaylist
                  currentPlaylistObj={this.state.currentPlaylistObj}
                  spotifyUserId={this.state.spotifyId}
                />
              )}
            </Grid.Column>

            <Grid.Column style={{ width: '20%' }}>
              {this.state.spotifyId && (<FollowingContainer
                refresh={refreshFollowing}
                spotifyId={this.state.spotifyId}
                playFollowingTrack={this.playFollowingTrack}
                newPlaylistHandleClick={this.newPlaylistHandleClick}
                following={this.state.following}
                handleRemoveFollow={this.handleRemoveFollow}
              />)}
            </Grid.Column>

          </Grid>
          {this.state.songToPlay.trackID ?
            <BottomPlayer URI={`spotify:track:${this.state.songToPlay.trackID}`} /> :
            this.state.currentMySong.trackID && <BottomPlayer URI={`spotify:track:${this.state.currentMySong.trackID}`} />
          }
        </Container>
      </div>
    );
  }
}

export default HomePage;

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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: '',
      currentUser: '',
      following: [],
      mySongUsername: '',
      spotifyDisplayName: '',
      spotifyId: null,
      spotifyRefreshToken: '',
      spotifyToken: '',
      spotifyUsername: '',
      playlists:[],
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
    this.handleFollowingRefresh = this.handleFollowingRefresh.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
    this.handlePlaylistEntryClick = this.handlePlaylistEntryClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/me')
      .then((res) => {
        const user = res.data.passport.user;
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
      .then((res) => {
        axios.get(`/api/playlists?spotifyUserID=${this.state.spotifyId}`)
          .then((response) => {
            this.setState({ playlists: response.data[0].playlists });
            return response;
          })
          .catch(err => err);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/getAllUsers')
      .then((results) => {
        const formatOptions = [];
        results.data.forEach((result) => {
          const formatResult = {};
          formatResult.title = result.mySongUsername;
          formatResult.key = result._id; // eslint-disable-line
          // formatResult.onClick = (e) => { e.preventDefault(); };
          // the i in spotifyid is not capitalized to avoid an error
          formatResult.spotifyid = result.spotifyId;
          formatOptions.push(formatResult);
        });
        this.setState({ options: formatOptions });
      })
      .catch((err) => {
        throw err;
      });

    this.updatePlaylists();
  }

  getFollowing() {
    axios.get('/api/getFollowing')
      .then((following) => {
        this.setState({
          following
        })
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
      });
  }

  updatePlaylists(newPlaylist) {
    axios.get('/api/playlists')
      .then((response) => {
        if (newPlaylist) {
          const newPlaylistObj = {
            name: newPlaylist.playlistName,
            playlistID: newPlaylist.spotifyPlaylistID,
            playlistURI: newPlaylist.spotifyPlaylistURI,
            updated: true,
          };

          this.setState({
            currentPlaylistObj: newPlaylistObj,
            playlists: response.data[0].playlists,
          });
        } else {
          const playlistResults = response.data[0].playlists;
          if (playlistResults.length) {
            const firstPlaylistObj = {
              name: playlistResults[0].playlistName,
              playlistID: playlistResults[0].spotifyPlaylistID,
              playlistURI: playlistResults[0].spotifyPlaylistURI,
              updated: true,
            };

            this.setState({
              currentPlaylistObj: firstPlaylistObj,
              playlists: response.data[0].playlists,
            });
          } else {
            this.setState({
              currentPlaylistObj: {},
              playlists: response.data[0].playlists,
            });
          }
        }
      })
      .catch(err => err);
  }

  handlePlaylistEntryClick(playlistID, playlistURI, name) {
    this.setState({
      currentPlaylistObj: {
        playlistID,
        playlistURI,
        name,
        updated: false,
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
      <div className="wrapper">
        <NavBarContainer
          spotifyId={this.state.spotifyId}
          following={this.state.following}
          refreshFollowing={this.handleFollowingRefresh}
          history={this.props.history}
          options={this.state.options}
          username={this.state.mySongUsername}
        />
        <MyCurrentSongContainer
          currentMySong={this.state.currentMySong}
          spotifyId={this.state.spotifyId}
          spotifyToken={this.state.spotifyToken}
          onMySongChange={this.handleMySongChange}
        />
        <div className="playlists">playlists</div>
        <div className="current-playlist">current-playlist</div>
        <div className="friends">friends</div>
        <div className="bottom-player">bottom-player</div>
        {this.state.songToPlay.trackID ? <BottomPlayer URI={`spotify:track:${this.state.songToPlay.trackID}`} /> :
          this.state.currentMySong.trackID && <BottomPlayer URI={`spotify:track:${this.state.currentMySong.trackID}`} />
        }
      </div>
    );
  }
}

export default HomePage;

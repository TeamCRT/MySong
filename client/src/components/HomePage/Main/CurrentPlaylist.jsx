import React from 'react';
import axios from 'axios';
import CurrentPlaylistSong from './CurrentPlaylistSong';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSongArr: null,
    };
    this.makeArrayofURIs = this.makeArrayofURIs.bind(this);
    this.getAPlaylist();
    this.songMapFunction = this.songMapFunction.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPlaylistObj.name !== this.props.currentPlaylistObj.name) {
      this.getAPlaylist();
    }
  }

  getAPlaylist() {
    axios.get(`/api/aplaylist?spotifyUserId=${this.props.spotifyUserId}&spotifyPlaylistURI=${this.props.currentPlaylistObj.playlistURI}&playlistName=${this.props.currentPlaylistObj.name}`)
      .then((response) => {
        this.setState({
          playlistSongArr: response.data.DBResponse,
          songsArrayBySpotifyUserID: response.data.songsArrayBySpotifyUserID,
        });
      })
      .catch(err => err);
  }

  songMapFunction(spotifyUserId) {
    let songObj;
    this.state.playlistSongArr.forEach((item) => { if (item.spotifyId === spotifyUserId) songObj = item; });
    return (<CurrentPlaylistSong
      key={songObj.currentMySong.trackID}
      user={songObj.mySongUsername}
      trackObj={songObj.currentMySong}
    />);
  }

  makeArrayofURIs() {
    const arrMapFunction = item => `spotify:track:${item.currentMySong.trackID}`;
    const songURIs = this.state.playlistSongArr.map(arrMapFunction);
    axios({
      method: 'post',
      url: '/api/spotifyAPI/createPlaylist',
      data: {
        songURIs,
        playlistName: this.props.currentPlaylistObj.name,
        spotifyUserID: this.props.spotifyUserId,
      },
    });
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.props.currentPlaylistObj.name}
          <button
            onClick={this.makeArrayofURIs}
            style={{ fontSize: 15, marginLeft: 20 }}
          >Save this Playlist on Spotify
          </button>
        </h1>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {this.state.playlistSongArr && this.state.songsArrayBySpotifyUserID.map(this.songMapFunction)}
      </div>
    );
  }
}

export default CurrentPlaylist;

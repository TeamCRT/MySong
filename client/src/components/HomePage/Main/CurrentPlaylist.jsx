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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentPlaylistObj.name !== this.props.currentPlaylistObj.name) {
      this.getAPlaylist();
    }
  }

  getAPlaylist() {
    axios.get(`/api/aplaylist?spotifyUserId=${this.props.spotifyUserId}&spotifyPlaylistURI=${this.props.currentPlaylistObj.playlistURI}&playlistName=${this.props.currentPlaylistObj.name}`)
      .then((response) => {
        console.log('response', response)
        this.setState({
          playlistSongArr: response.data,
        });
      })
      .catch(err => err);
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

  songMapFunction(songObj) {
    return (<CurrentPlaylistSong
      key={songObj.currentMySong.trackID}
      user={songObj.mySongUsername}
      trackObj={songObj.currentMySong}
    />);
  }


  render() {
    console.log('CUREENT SONG ARRAY', this.state.playlistSongArr);
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
        {this.state.playlistSongArr && this.state.playlistSongArr.map(this.songMapFunction)}
      </div>
    );
  }
}

export default CurrentPlaylist;

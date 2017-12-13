import React from 'react';
import axios from 'axios';
import CurrentPlaylistSong from './CurrentPlaylistSong';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSongArr: null,
    };
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
        this.setState({
          playlistSongArr: response.data,
        });
      })
      .catch(err => err);
  }

  songMapFunction(songObj) {
    return (<CurrentPlaylistSong
      key={songObj.currentMySong.trackID}
      user={songObj.spotifyId}
      trackObj={songObj.currentMySong}
    />);
  }


  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.props.currentPlaylistObj.name}</h1>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {this.state.playlistSongArr && this.state.playlistSongArr.map(this.songMapFunction)}
      </div>
    );
  }
}

export default CurrentPlaylist;

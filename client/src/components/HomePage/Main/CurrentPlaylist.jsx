import React from 'react';
// import { Grid } from 'semantic-ui-react';
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

  getAPlaylist() {
    axios.get(`/api/aplaylist?spotifyUserId=${this.props.spotifyUserId}&spotifyPlaylistURI=${this.props.currentPlaylistObj.playlistURI}`)
      .then((response) => {
        console.log('response.data', response.data)
        this.setState({ playlistSongArr: response.data });
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
        {/*<button onClick={this.getAPlaylist.bind(this)}>Test getAPlaylist</button>*/}
        <div style={{ textAlign: 'center' }}>{this.props.currentPlaylistObj.title}</div>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {this.state.playlistSongArr && this.state.playlistSongArr.map(this.songMapFunction)}
        {!this.state.playlistSongArr && <iframe
          title="currentPlaylistIframe"
          src={`https://open.spotify.com/embed?uri=${this.props.currentPlaylistObj.playlistURI}`}
          frameBorder="0"
          height="400"
          width="100%"
        />}
      </div>
    );
  }
}

export default CurrentPlaylist;

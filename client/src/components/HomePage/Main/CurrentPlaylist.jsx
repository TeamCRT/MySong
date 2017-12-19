/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import CurrentPlaylistSong from './CurrentPlaylistSong';
import EditPlaylistModal from './EditPlaylistModal';
import DeletePlaylistModal from './DeletePlaylistModal';
import { Button } from 'semantic-ui-react';

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSongArr: [],
    };

    this.saveToSpotify = this.saveToSpotify.bind(this);
    this.songMapFunction = this.songMapFunction.bind(this);
    this.getAPlaylist();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPlaylistObj.name !== this.props.currentPlaylistObj.name || this.props.currentPlaylistObj.updated) {
      this.props.currentPlaylistObj.updated = false;
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
    this.state.playlistSongArr.forEach((item) => {
      if (item.spotifyId === spotifyUserId) songObj = item;
    });
    return (<CurrentPlaylistSong
      key={songObj.currentMySong.trackID}
      user={songObj.mySongUsername}
      trackObj={songObj.currentMySong}
    />);
  }

  saveToSpotify() {
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
            onClick={this.saveToSpotify}
            style={{ fontSize: 15, marginLeft: 20 }}
          >Save this Playlist on Spotify
          </button>
          <DeletePlaylistModal
            playlists={this.props.playlists}
            updatePlaylists={this.props.updatePlaylists}
            playlistName={this.props.currentPlaylistObj.name}
            spotifyId={this.props.spotifyUserId}
            playlistSongArr={this.state.playlistSongArr}
          />
          <EditPlaylistModal
            playlists={this.props.playlists}
            updatePlaylists={this.props.updatePlaylists}
            playlistName={this.props.currentPlaylistObj.name}
            spotifyId={this.props.spotifyUserId}
            playlistSongArr={this.state.playlistSongArr}
            refreshFollowing={this.props.refreshFollowing}
            view={this.props.view}
          />

        </h1>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {
          this.state.playlistSongArr && this.state.playlistSongArr.length > 0 &&
          this.state.songsArrayBySpotifyUserID.map(this.songMapFunction)
        }
      </div>
    );
  }
}

export default CurrentPlaylist;

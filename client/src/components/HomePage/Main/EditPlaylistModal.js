import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal, Grid, Divider } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import Following from '../Following/Following'
import axios from 'axios'

class EditPlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: '',
      newPlaylist: this.props.playlistSongArr,
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
       illegalCharError: false,
    };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playlistSongArr && prevProps.playlistSongArr !== this.props.playlistSongArr) {
      var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
      this.setState({newPlaylist: playlistArray});
      this.setState({newPlaylistName: this.props.playlistName});
    }
  }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value});
  }

  handleUpdate() {
    var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
    this.setState({newPlaylist: playlistArray});
    this.setState({newPlaylistName: this.props.playlistName});
  }

  handlePlaylistChange() {
    var newPlaylistSongsArray = this.props.playlistSongArr && this.props.playlistSongArr.map((result,index)=>result.spotifyId);
    this.setState({ newPlaylist: newPlaylistSongsArray });
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);
    var illegalChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var originalPlaylistName = this.props.playlistName;
    var originalPlaylistNameIndex = userPlaylists.indexOf(originalPlaylistName);
    userPlaylists.splice(originalPlaylistNameIndex, 1)

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
    this.setState({illegalCharError: false});
    //Error Handling
    if (this.state.newPlaylistName === '' && this.state.newPlaylist.length === 0) {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: true});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylist.length === 0) {
      this.setState({noSongsInPlaylistError: true});
      this.setState({noPlaylistNameError :false});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylistName === '') {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: false});
      this.setState({playlistNameAlreadyExistsError: false});
      return;
    }

    if (illegalChars.test(this.state.newPlaylistName) == true) {
      this.setState({illegalCharError: true});
      return;
    }

    if (userPlaylists.includes(this.state.newPlaylistName)) {
      this.setState({playlistNameAlreadyExistsError: true});
      this.setState({noPlaylistNameError :false});
      this.setState({noSongsInPlaylistError: false});
      return;
    }

    if (this.state.newPlaylist.length !== 0 && this.state.newPlaylistName !== '' && (!userPlaylists.includes(this.state.newPlaylistName))) {
      this.setState({noPlaylistNameError :false});
      this.setState({noSongsInPlaylistError: false});
      this.setState({playlistNameAlreadyExistsError: false});
      var newPlaylist = {
         "playlistName" : this.state.newPlaylistName,
         "spotifyPlaylistID" : "testForNow",
         "spotifyPlaylistURI" : "testForNow",
         "songsArrayBySpotifyUserID" : this.state.newPlaylist
      }

      var updatePlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId,
        originalName: this.props.playlistName
      }

      axios({
        method: 'put',
        url: '/api/aplaylist',
        data: updatePlaylistPayload
      })
      .then((results) => {
        this.props.updatePlaylists(newPlaylist);
      })
      .catch((err) => {
         console.log('AXIOS PUT REQUEST ERROR!', err);
      });

    }
    this.setState({open:false});
  }

  handleCancel() {
    this.setState({newPlaylistName: ''});
    this.setState({newPlaylist: []});
    this.setState({open:false});

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
    this.setState({illegalCharError: false});
  }

  newPlaylistHandleClick(follow) {
    var songsArray = this.state.newPlaylist;
    if (!songsArray.includes(follow.spotifyId)) {
      songsArray.push(follow.spotifyId);
      this.setState({newPlaylist: songsArray})
    }  else {
      var index = songsArray.indexOf(follow.spotifyId);
      songsArray.splice(index, 1);
      this.setState({newPlaylist: songsArray});
    }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    return (
      <div>
        <Button color='grey' onClick={this.show(true)}>Edit</Button>
        <Modal dimmer={false} open={open} onClose={this.close}>
          <Modal.Header>Edit a Playlist</Modal.Header>
          <Modal.Content image>
          <div>

          </div>

          <Grid columns={2} stackable>
            <Grid.Column>
              {this.props.spotifyId && ( <FollowingContainer
                spotifyId={this.props.spotifyId}
                newPlaylistHandleClick={this.newPlaylistHandleClick}
                refreshFollowing={this.props.refreshFollowing}
                view={this.props.view}
              /> ) }
            </Grid.Column>

            <Header>
              {this.state.noPlaylistNameError &&
                <div style={{color:'red'}}>No Playlist Name</div>
              }
            </Header>



            <Grid.Column>
            <Header>{this.state.newPlaylist.length }</Header>
            <Header>{this.state.newPlaylistName}</Header>


            <Header>
              {this.state.noSongsInPlaylistError &&
                <div style={{color:'red'}}>No Songs in Playlist</div>
              }
            </Header>

            <Header>
              {this.state.playlistNameAlreadyExistsError &&
                <div style={{color:'red'}}>Playlist Name Already Exists</div>
              }
            </Header>

            <Header>
              {this.state.illegalCharError &&
                <div style={{color:'red'}}>Illegal Character(s) In Playlist Name!</div>
              }
            </Header>

            <Header>
            </Header>
              Playlist Name
              <input value={this.state.newPlaylistName} onChange={this.handlePlaylistNameChange}></input>
               {this.state.newPlaylist.map((result, index) => (
               <div> {'-'}
                {result}
               </div>
                ))}
            </Grid.Column>



          </Grid>

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleUpdate}>Undo All Changes</Button>
            <Button color='black' onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default EditPlaylistModal

import React, { Component } from 'react'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import axios from 'axios'

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: '',
      newPlaylist: [],
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
    };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  // componentWillUpdate() {
  //   this.setState({noPlaylistNameError :false});
  //   this.setState({noSongsInPlaylistError: false});
  //   this.setState({playlistNameAlreadyExistsError: false});
  // }
  //state = { open: false }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value});
    console.log('Playlists from state are ', this.props.playlists);
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
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

      var newPlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId
      }

      axios.post('/api/aplaylist', newPlaylistPayload)
        .then((results) => {
           this.setState({newPlaylistName: ''});
           this.setState({newPlaylist: []});
           this.props.updatePlaylists(newPlaylist);
        })
        .catch((err) => {
          throw err;
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
    const { open } = this.state

    return (
      <div>
        <Button color='red' onClick={this.show(true)}>Create</Button>
        <Modal dimmer={false} open={open} onClose={this.close}>
          <Modal.Header>Create a Playlist</Modal.Header>
          <Modal.Content image>


          <Grid columns={2} stackable>
            <Grid.Column>
              {this.props.spotifyId && ( <FollowingContainer
                spotifyId={this.props.spotifyId}
                newPlaylistHandleClick = {this.newPlaylistHandleClick}
                following={this.props.following}
              /> ) }
            </Grid.Column>

            <Header>
              {this.state.noPlaylistNameError &&
                <div style={{color:'red'}}>No Playlist Name</div>
              }
            </Header>



            <Grid.Column>
            <Header>{this.state.newPlaylist.length}</Header>
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
            </Header>
              New Playlist Name
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

export default CreatePlaylistModal

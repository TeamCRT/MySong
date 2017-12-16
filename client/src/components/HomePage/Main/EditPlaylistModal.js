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
    };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this); 
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this); 
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

     // {this.props.playlistSongArr &&
     //            <div style={{color:'red'}}>{this.props.playlistSongArr.map((result,index)=>

     //              <div>{result.spotifyId}</div>

     //              )}</div>
     //          }


    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlistSongArr !== this.props.playlistSongArr) {
      console.log('Update called - props ', this.props.playlistSongArr );
      var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
      this.setState({newPlaylist: playlistArray});
      console.log('Update called - playlist obj name ', this.props.playlistName);
      this.setState({newPlaylistName: this.props.playlistName});
      console.log('Update called - state ', this.state.newPlaylist );
    }
  }

  //state = { open: false }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value});
  }

  handleUpdate() {
    // this.setState({newPlaylist: this.props.playlistSongArr});
    console.log('Update called - props ', this.props.playlistSongArr );
    var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
    this.setState({newPlaylist: playlistArray});
    this.setState({newPlaylistName: this.props.playlistName});
    console.log('Update called - state ', this.state.newPlaylist );
  }

  handlePlaylistChange() {
    var newPlaylistSongsArray = this.props.playlistSongArr && this.props.playlistSongArr.map((result,index)=>result.spotifyId);
    console.log('new playlist song array is ', newPlaylistSongsArray);
    this.setState({ newPlaylist: newPlaylistSongsArray });
  }

  handleSave() {
    console.log('SAVE button pressed!');
    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    //Error Handling
    if (this.state.newPlaylistName === '' && this.state.newPlaylist.length === 0) {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: true});
      console.log('Not enough songs and no playlist name');
      return;
    }
    
    if (this.state.newPlaylist.length === 0) {
      this.setState({noSongsInPlaylistError: true});
      this.setState({noPlaylistNameError :false});
      console.log('Not enough songs in playlist');
      return;
    }

    if (this.state.newPlaylistName === '') {
      this.setState({noPlaylistNameError :true});
      this.setState({noSongsInPlaylistError: false});
      console.log('Playlist has no name');
      return;
    }

    if (this.state.newPlaylist.length !== 0 && this.state.newPlaylistName !== '') {
      console.log('All conditions met!');
      this.setState({noPlaylistNameError :false});
      this.setState({noSongsInPlaylistError: false});
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

      // axios.post('/api/aplaylist', newPlaylistPayload)
      //   .then((results) => {
      //      console.log('Successfully added new playlist to database!');
      //      this.setState({newPlaylistName: ''});
      //      this.setState({newPlaylist: []});
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     throw err;
      //   });
      axios({
        method: 'put',
        url: '/api/aplaylist',
        data: updatePlaylistPayload
      })
      .then((results) => {
        console.log('AXIOS PUT REQUEST SUCCESSFUL!', results);
        this.props.updatePlaylists(newPlaylist);
      })
      .catch((err) => {
         console.log('AXIOS PUT REQUEST ERROR!', err);
      });

    }
    this.setState({open:false});
  }

  handleCancel() {
    console.log('CANCEL button pressed!');
    this.setState({newPlaylistName: ''});
    this.setState({newPlaylist: []});
    this.setState({open:false});
  }

  newPlaylistHandleClick(follow) {
    console.log('newPlaylistHandleClick function activated!', follow);
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
    console.log('this state song array is', this.state.newPlaylist);
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
                spotifyId={this.props.spotifyId} newPlaylistHandleClick = {this.newPlaylistHandleClick}
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

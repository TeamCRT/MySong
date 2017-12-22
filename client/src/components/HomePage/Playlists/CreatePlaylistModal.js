import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import CreatedPlaylist from './CreatedPlaylist'
import axios from 'axios'
import $ from 'jquery';

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: '',
      newPlaylist: [],
      followObjectArray: [],
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false,
      name: 'Bob',
      hover: false,
    };


    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);

  }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value, noPlaylistNameError: false});
    console.log('new playlist name is ', this.state.newPlaylistName);
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);
    var illegalChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

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

      var newPlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId
      }

      axios.post('/api/aplaylist', newPlaylistPayload)
        .then((results) => {
           this.setState({newPlaylistName: ''});
           this.setState({newPlaylist: []});
           this.setState({followObjectArray: []});
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
    this.setState({followObjectArray: []});
    this.setState({open:false});

    this.setState({noPlaylistNameError :false});
    this.setState({noSongsInPlaylistError: false});
    this.setState({playlistNameAlreadyExistsError: false});
    this.setState({illegalCharError: false});
  }

  handleMinusClick(result) {
    console.log('minus clicked', result);

    var songsArray = this.state.newPlaylist;
    var followObjectArray = this.state.followObjectArray;

    var index = songsArray.indexOf(result.spotifyId);
    songsArray.splice(index, 1);
    followObjectArray.splice(index, 1);
    this.setState({newPlaylist: songsArray});
    this.setState({followObjectArray: followObjectArray});
    
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
    console.log('hover is', this.state.hover);
  }

  newPlaylistHandleClick(follow) {
    var songsArray = this.state.newPlaylist;
    var followObjectArray = this.state.followObjectArray;

    if (!songsArray.includes(follow.spotifyId)) {
      songsArray.push(follow.spotifyId);
      followObjectArray.push(follow);
      this.setState({newPlaylist: songsArray});
      this.setState({followObjectArray: followObjectArray});
    }  
    // else {
    //   var index = songsArray.indexOf(follow.spotifyId);
    //   songsArray.splice(index, 1);
    //   followObjectArray.splice(index, 1);
    //   this.setState({newPlaylist: songsArray});
    //   this.setState({followObjectArray: followObjectArray});
    // }

    if (this.state.newPlaylist.length > 0) {
      this.setState({noSongsInPlaylistError: false});
    }

///////////////
    // console.log('follow is', follow);
    // var followObjectArray = this.state.followObjectArray;
    // followObjectArray.push(follow);
    // this.setState({followObjectArray: followObjectArray});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    var myStyle;

    return (

      <div>
        <Button color='red' onClick={this.show(true)}>Create</Button>
        <Modal dimmer={true} open={open} onClose={this.close}>
          <Modal.Header>Create a Playlist</Modal.Header>
          <div id='outer' style={{display: 'flex', flexDirection: 'row', height: '560px', width: '900px', backgroundColor:'red'}}>
            
            <div id='left half' style={{display: 'flex', flexDirection: 'column', backgroundColor: '#9ca6b7', width: '50%', height: '100%'}}>
              <div id='first child' style={{backgroundColor: 'black', color: 'white', height: '10%', fontSize: '20px', textAlign: 'center', padding: '.3em'}}>People You're Following</div>
              
              <FollowingContainer
                spotifyId={this.props.spotifyId}
                newPlaylistHandleClick = {this.newPlaylistHandleClick}
                following={this.props.following}
                refreshFollowing={this.props.refreshFollowing}
                view={this.props.view}
              /> 
              
            </div>


            <div id='right half' style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '50%', height: '100%'}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', maxHeight: '35px'}}>
                 <div style={{backgroundColor: '#474a4f', minWidth: '200px', color: 'white', fontSize: '20px', padding: '6px 17px'}}>Playlist Name</div>
                 <Input onChange={this.handlePlaylistNameChange} style={{fontSize: '20px', maxWidth: '240px'}} focus placeholder='Type playlist name...' />
              </div>
               <CreatedPlaylist 
                noSongsInPlaylistError={this.state.noSongsInPlaylistError}
                followObjectArray={this.state.followObjectArray}
                handleMinusClick={this.handleMinusClick}
                />
            </div>
          </div>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel} content="Cancel"/>
            <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default CreatePlaylistModal

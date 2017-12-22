import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal, Grid, Divider, Input, Label, TextArea } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import EditPlaylist from '../Main/EditPlaylist'
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
    this.handleMinusClick = this.handleMinusClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlistSongArr !== this.props.playlistSongArr) {
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

  handleMinusClick(result) {
    var songsArray = this.state.newPlaylist;
    var followObjectArray = this.state.followObjectArray;
    var index = songsArray.indexOf(result.spotifyId);
    songsArray.splice(index, 1);
    followObjectArray.splice(index, 1);
    this.setState({newPlaylist: songsArray,
      followObjectArray: followObjectArray});
  }

  newPlaylistHandleClick(follow) {
    console.log('follow is', follow);
    console.log('playlistSongArr', this.props.playlistSongArr);
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
        <Button color='red' onClick={this.show(true)}>Edit</Button>
        <Modal dimmer={true} open={open} onClose={this.close}>
          <Modal.Header>Create a Playlist</Modal.Header>
          <div id='outer' style={{display: 'flex', flexDirection: 'row', height: '560px', width: '900px', backgroundColor:'red'}}>
      
            <div id='left half' style={{display: 'flex', flexDirection: 'column', backgroundColor: '#9ca6b7', width: '50%', height: '100%'}}>
              <div id='first child' style={{background: 'linear-gradient(0deg, black, #4f4f51)', color: 'white', height: '10%', fontSize: '20px', textAlign: 'center', padding: '.3em'}}>People You're Following</div>
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
                 <div style={{background: 'linear-gradient(0deg, #4f4f51,#939396)', minWidth: '200px', color: 'white', fontSize: '20px', padding: '6px 17px'}}>Playlist Name</div>
                 <TextArea onChange={this.handlePlaylistNameChange} style={{fontSize: '20px', maxWidth: '240px'}} focus placeholder='Type playlist name...'>{this.props.currentPlaylistObj.name}</TextArea>
                  {this.state.noPlaylistNameError && <Label style={{padding: '10px', minWidth: '100px', height:'120px', fontSize: '20px'}} basic color='red' pointing='left'>Please include playlist name</Label> ||
                   this.state.illegalCharError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '160px', minWidth: '130px'}} basic color='red' pointing='left'>Playlist name contains illegal characters</Label> ||
                   this.state.playlistNameAlreadyExistsError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '120px', minWidth: '110px'}} basic color='red' pointing='left'>Playlist name already exists</Label>}
              </div>
              <EditPlaylist
                noSongsInPlaylistError={this.state.noSongsInPlaylistError}
                currentPlaylistObjArray={this.props.playlistSongArr}
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

export default EditPlaylistModal

import React, { Component } from 'react'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import axios from 'axios'

class DeletePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }


  handleDelete() {
    console.log('Delete playlist button confirmed!');
    // console.log('current playlist name is ', this.props.playlistName);
    axios.delete(`/api/deletePlaylist?playlistName=${this.props.playlistName}`)
      .then((response) => {
        console.log('Playlist successfully deleted!');
        this.props.updatePlaylists();
      })
      .catch((err) => {
        throw err;
      })

      this.setState({open:false});
  }

  handleCancel() {
    console.log('Cancel delete modal button pressed!');
    this.setState({open:false});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button style={{float: 'right'}} color='grey' onClick={this.show(true)}>Delete</Button>
        <Modal size='small' dimmer={true} open={open} onClose={this.close}>
          <Modal.Header >Delete Playlist</Modal.Header>
          <Modal.Content style={{fontSize: '30px', textAlign: 'center'}}>
          Are you sure you want to delete this playlist?


          </Modal.Content>
          <Modal.Actions>
            <Button negative content="No" onClick={this.handleCancel}>
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yes" onClick={this.handleDelete} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeletePlaylistModal

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
  }

  handleCancel() {
    console.log('Cancel delete modal button pressed!');
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <div>
        <Button style={{float: 'right'}} color='grey' onClick={this.show(true)}>Delete</Button>
        <Modal dimmer={false} open={open} onClose={this.close}>
          <Modal.Header>Delete Playlist?</Modal.Header>
          <Modal.Content image>



          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Delete" onClick={this.handleDelete} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeletePlaylistModal

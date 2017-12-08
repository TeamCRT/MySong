import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //state = { open: false }

   handleChange(e) {
    this.props.onMySongChange(e.target.value);
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)}>Edit</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your mysong</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
            <Modal.Description>
              <Header>Select Your New MySong</Header>
              <p>Pick a new MySong</p>
              <input onChange = {this.handleChange}></input>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Close
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="OK" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default MySongModal
import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData:''
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  //state = { open: false }

   handleChange(e) {
    this.props.onMySongChange(e.target.value);
  }

  handleFormSubmit(e) {
  	e.preventDefault();
  	console.log('Form was submitted!', this.state.formData);

  	  axios({ method: 'GET', url: 'https://api.spotify.com/v1/search', headers: {Authorization: 'BQBnI7Z_-DtDJziDRQVDtRAmzKA498MVa4L2RJtGwx6aJTw6IQDGDFymeOG3gRQbwSsFiCUszwpRvzquOx486wg4EDUhXz4NbdOeBjHgUNH7z1YBX6XcCIGERoXlk3bt6rJYjJml0knhEslRQPms1cyEg2-nuicW2GEROfRZtVCFBowofHrkXZFeUhhd-JHT-HaXeHfZvMNiR9EHBDJ4fx56VISFU-FLp1gTvrnj'} })
  	  .then(res => {
  	  	console.log('axios get request to spotify search was successful!');
  	  })
  	  .catch((err) => {
  	  	console.log('Axios search request FAILED!!');
        console.log(err);
      });
  }

  handleFormChange(e) {
  	e.preventDefault();
  	this.setState({formData: e.target.value});
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
              <form onSubmit={this.handleFormSubmit} >
                <input type='text' value={this.state.formData} onChange={this.handleFormChange} ></input>
              	<input type='submit'></input>
              </form>
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
import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData:'', 
      searchResult: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addSearchResult = this.addSearchResult.bind(this);
  }
  //state = { open: false }

   handleChange(e) {
    this.props.onMySongChange(e.target.value);
  }

   addSearchResult(result) {
    this.setState({searchResult: result});
  }

   handleFormSubmit(e) {
  	e.preventDefault();
  	console.log('Form was submitted!', this.state.formData);
  	var context = this;

  	 	$.ajax({
				type:'GET',
				url:'https://api.spotify.com/v1/search?q=tiny+dancer&type=track&market=US&limit=5&offset=5',
				contentType:'application/json', 
				headers: {
                'Authorization': 'Bearer BQCl1bbbHh9dEN6k2Vp3xOrZWAgeCzGec8LfOYNcHXJw3nhXiQISpafRV-ek7UJxgkTZPQfAbIIyvenXdtMPyhO1Yhce2WYxRSHToxexapKIPKmpUuRYuIB2yUoZSZu1lt_Va_N1fZ0wuQiGoA'
            },
				success:function(resp) {
					console.log('GET request successful', resp.tracks.items[0].name);
					var searchResults = [];
					for (var i = 0; i < resp.tracks.items.length; i++) {
						var result = {
							track_name: resp.tracks.items[i].name, 
							track_id: resp.tracks.items[i].href, 
							track_artist: resp.tracks.items[i].artists[0].name, 
							track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name
					  }
					 searchResults.push(result);
					}
					context.addSearchResult(searchResults);
					console.log(context.state);
				}
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
            <Modal.Description>
              <Header>Select Your New MySong</Header>
              <p>Pick a new MySong</p>
              <input onChange = {this.handleChange}></input>
              <form onSubmit={this.handleFormSubmit} >
                <input type='text' value={this.state.formData} onChange={this.handleFormChange} ></input>
              	<input type='submit'></input>
              </form>
            </Modal.Description>
            <div>
    					{this.state.searchResult.map(result => (
      					<Button>{result.track_summary}</Button>
    						))}
  					</div>
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
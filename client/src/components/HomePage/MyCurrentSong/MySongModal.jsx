import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData:'',
      noteData: '',
      searchResults: [],
      showNote: false,
      trackSummary:'',
      trackID:'',
      trackAlbum:'',
      trackArist: '',
      trackName: '',
      note:'',
      showError: false,
      noSongSelectedError: false,
      noNoteError: false,
      noteTooLongError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.addSearchResults = this.addSearchResults.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
    this.handleSave= this.handleSave.bind(this);
  }

   handleChange(e) {
    e.preventDefault();
    var $element = $(e.target);
    console.log('button pressed ', $element.text());
    console.log('value attr is ', $element.attr('trackID'))
    this.setState({
      trackSummary: $element.text(),
      trackID: $element.attr('trackID'),
      trackAlbum: $element.attr('trackAlbum'),
      trackArtist: $element.attr('trackArtist'),
      trackName: $element.attr('trackName')
    });
  }

   addSearchResults(searchResults) {
    this.setState({searchResults: searchResults});
  }

   handleFormSubmit(e) {
  	e.preventDefault();
  	this.setState({showNote:true});
  	console.log('Form was submitted!', this.state.formData);
  	var query = this.state.formData.split(' ').join('+');
  	var context = this;
    var spotifyToken = this.props.spotifyToken;

  	 	$.ajax({
				type:'GET',
				url:`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=15&offset=0`,
				contentType:'application/json',
				headers: {
                'Authorization': 'Bearer ' + spotifyToken
            },
				success:function(resp) {
					console.log('GET request to https://api.spotify.com/v1/search successful!');
          context.setState({
            showError: resp.tracks.items.length !== 0 ? false : true
          })
					var searchResults = [];
					for (var i = 0; i < resp.tracks.items.length; i++) {
						var result = {
							track_name: resp.tracks.items[i].name,
							track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
							track_artist: resp.tracks.items[i].artists[0].name,
              track_album: resp.tracks.items[i].album.name,
							track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name
					  }
					 searchResults.push(result);
					}
					context.addSearchResults(searchResults);
				}
			});
  }

  handleFormChange(e) {
  	e.preventDefault();
  	this.setState({formData: e.target.value});
  }

  handleNoteChange(e) {
  	e.preventDefault();
  	this.setState({noteData: e.target.value});
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  handleSave () {
    console.log('note is ', this.state.noteData);
    if (this.state.trackName === '' && this.state.noteData === '') {
      this.setState({noSongSelectedError :true});
      this.setState({noNoteError: true});
      console.log('No song selected && no note added');
      return;
    }

    if (this.state.trackName === '') {
      this.setState({noSongSelectedError: true});
      this.setState({noNoteError :false});
      console.log('No song selected!');
      return;
    }

    if (this.state.noteData === '') {
      this.setState({noNoteError :true});
      this.setState({noSongSelectedError: false});
      console.log('No note added!');
      return;
    }

    if (this.state.noteData.length > 180) {
      this.setState({noteTooLongError: true});
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      console.log('No note added!');
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180 ) {
      console.log('All conditions met!');
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      this.setState({noteTooLongError: false});

      var mySong = {
        trackSummary: this.state.trackSummary,
        trackID: this.state.trackID,
        trackAlbum: this.state.trackAlbum,
        trackName: this.state.trackName,
        trackArtist: this.state.trackArtist,
        note: this.state.noteData,
      };
      var mySongPayload = {
        mySong: mySong,
        spotifyId: this.props.spotifyId,
      }

      axios.post('/api/currentmysong', mySongPayload)
        .then((response) => {
            console.log('axios POST to /api/currentmysong successful', response);
            this.props.onMySongChange(mySongPayload.mySong);
        })
        .catch((err) => {
          throw err;
        });


    }
    this.setState({ open: false });
  }

  handleCancel = () => {
    this.setState({noNoteError :false});
    this.setState({noSongSelectedError: false});
    this.setState({noteTooLongError: false});
    this.setState({ open: false });
  };

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{textAlign:'center'}}>
        <Button onClick={this.show(true)}>Edit your current MySong</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>Pick a new MySong</p>
              <form onSubmit={this.handleFormSubmit} >
                <input type='text' value={this.state.formData} onChange={this.handleFormChange}></input>
              	<input type='submit'></input>
              </form>
              {this.state.showNote &&
              	<div> Add Song Note
              	  <div>
              	    <textarea
                    placeholder="Add Song Note" 
                    type='text' 
                    style={{width: '90%', height: '150px', resize: 'none', backgroundColor: '#f8f8f8', boxSizing: 'border-box'}} 
                    onChange={this.handleNoteChange} 
                    value={this.state.noteData}></textarea>
              	  </div>
              	</div>
              }
            </Modal.Description>
            <div>
    					{this.state.searchResults.map((result, index) => (
    					 <div>{index+1 + '. '}
      					<button onClick = {this.handleChange} key={result.track_id} trackID={result.track_id} trackAlbum={result.track_album} trackArtist={result.track_artist} trackName={result.track_name} >{result.track_summary}</button>
      				 </div>
    						))}
  					</div>
            <Header>{this.state.trackName}</Header>

            <div>
            {this.state.noSongSelectedError &&
                <div style={{color:'red'}}>Select a Song</div>
            }
            </div>

            <div>
            {this.state.noNoteError &&
                <div style={{color:'red'}}>Add a Note</div>
            }
            </div>

            <div>
            {this.state.noteTooLongError &&
                <div style={{color:'red'}}>Note Exceeds 180 characters</div>
            }
            </div>

            <span>
            {this.state.showError &&
             <span style={{fontSize:'40px'}}>No search results</span>
            }
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel}>Cancel</Button>
            <Button positive icon='checkmark' labelPosition='right' content="OK" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default MySongModal

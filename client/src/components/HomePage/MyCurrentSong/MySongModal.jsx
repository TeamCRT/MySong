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
    this.setState({
      trackSummary: $element.text(),
      trackID: $element.attr('track_id'),
      trackAlbum: $element.attr('track_album'),
      trackArtist: $element.attr('track_artist'),
      trackName: $element.attr('track_name')
    });
  }

   addSearchResults(searchResults) {
    this.setState({searchResults: searchResults});
  }

   handleFormSubmit(e) {
  	e.preventDefault();
  	this.setState({showNote:true});
  	var query = this.state.formData.split(' ').join('+');
  	var context = this;
    var spotifyToken = this.props.spotifyToken;

     axios({
          method: 'GET',
          url: `/api/spotifyAPI/search?track=${query}`,
        })
          .then((response) => {
            var resp = response.data;
            context.setState({
              showError: resp.tracks.items.length !== 0 ? false : true
            });
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
          })
          .catch(err => console.error(err, err));
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
    if (this.state.trackName === '' && this.state.noteData === '') {
      this.setState({noSongSelectedError :true});
      this.setState({noNoteError: true});
      return;
    }

    if (this.state.trackName === '') {
      this.setState({noSongSelectedError: true});
      this.setState({noNoteError :false});
      return;
    }

    if (this.state.noteData === '') {
      this.setState({noNoteError :true});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData.length > 180) {
      this.setState({noteTooLongError: true});
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180 ) {
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
    					 <div key={result.track_id}>{index+1 + '. '}
      					<button onClick = {this.handleChange} key={result.track_id} track_id={result.track_id} track_album={result.track_album} track_artist={result.track_artist} track_name={result.track_name} >{result.track_summary}</button>
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

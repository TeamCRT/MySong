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
    this.handleEditMySongClick = this.handleEditMySongClick.bind(this);
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
    this.setState({ showNote: true });
    const query = this.state.formData.split(' ').join('+');
    const context = this;

    axios({ method: 'GET', url: `/api/spotifyAPI/search?track=${query}` })
      .then((response) => {
        const resp = response.data;
        context.setState({
          showError: resp.tracks.items.length !== 0 ? false : true
        });
        const searchResults = [];
        for (let i = 0; i < resp.tracks.items.length; i++) {
          const result = {
            track_name: resp.tracks.items[i].name,
            track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
            track_artist: resp.tracks.items[i].artists[0].name,
            track_album: resp.tracks.items[i].album.name,
            track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name
          };
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

  handleEditMySongClick() {
    const createdAt = this.props.currentMySong.createdAt;
    const mySong = {
      trackSummary: this.state.trackSummary,
      trackID: this.state.trackID,
      trackAlbum: this.state.trackAlbum,
      trackName: this.state.trackName,
      trackArtist: this.state.trackArtist,
      note: this.state.noteData,
      createdAt,
    };
    axios.post('/api/currentMySongWaitTime', mySong)
      .then((time) => {
        if (time.data) {
          console.log('TIME DATA', time.data);
          // const timeInMins = Math.ceil(((time.data.waitPeriod - time.data.timeElapsed) / 1000) / 60);
          const timeInSecs = Math.ceil(((time.data.waitPeriod - time.data.timeElapsed) / 1000));
          this.props.setWait(true, timeInSecs);
        } else {
          this.props.setWait(false);
          this.setState({open:true});
        }
      })
      .catch( err => console.error(err))
  };

  handleSave() {
    if (this.state.trackName === '' && this.state.noteData === '') {
      this.setState({noSongSelectedError :true, noNoteError: true});
      return;
    }

    if (this.state.trackName === '') {
      this.setState({noSongSelectedError: true, noNoteError :false});
      return;
    }

    if (this.state.noteData === '') {
      this.setState({noNoteError :true, noSongSelectedError: false});
      return;
    }

    if (this.state.noteData.length > 180) {
      this.setState({noteTooLongError: true, noNoteError :false, noSongSelectedError: false});
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180 ) {
      this.setState({noNoteError :false, noSongSelectedError: false, noteTooLongError: false});
      let createdAt = this.props.currentMySong.createdAt;
      const mySong = {
        trackSummary: this.state.trackSummary,
        trackID: this.state.trackID,
        trackAlbum: this.state.trackAlbum,
        trackName: this.state.trackName,
        trackArtist: this.state.trackArtist,
        note: this.state.noteData,
        createdAt,
      };
      const mySongPayload = {
        mySong,
        spotifyId: this.props.spotifyId,
      }

      axios.post('/api/currentmysong', mySongPayload)
        .then((updatedMySong) => {
          if (updatedMySong.data === 'Not enough time has passed') {
            this.props.setWait(true);
          } else {
            this.props.onMySongChange(updatedMySong.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
    this.setState({ open: false });
  }

  handleCancel() {
    this.setState({
      noNoteError: false,
      noSongSelectedError: false,
      noteTooLongError: false,
      open: false,
    });
  }

  render() {
    const { open, dimmer } = this.state
    return (
      <div className="my-song-modal" style={{textAlign:'center'}}>
        <h3>Current MySong:</h3>
        <Button onClick={this.handleEditMySongClick}>Edit your current MySong</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <p>Pick a new MySong</p>
              <form onSubmit={this.handleFormSubmit} >
                <input type="text" value={this.state.formData} onChange={this.handleFormChange}/>
                <input type="submit"/>
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

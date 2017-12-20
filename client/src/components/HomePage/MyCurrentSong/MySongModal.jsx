import React, { Component } from 'react'
import { Button, Modal, Header, Input } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';
import SearchResults from './SearchResults'

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
      songSearchValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.addSearchResults = this.addSearchResults.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
    this.handleSave= this.handleSave.bind(this);

    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleSongSubmit = this.handleSongSubmit.bind(this);
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

  handleSongSearch(e) {
    e.preventDefault();
    this.setState({songSearchValue: e.target.value});
    
  }

  handleSongSubmit() {
    console.log('Submit button pressed!');
    console.log(this.state.songSearchValue);
    var query = this.state.songSearchValue.split(' ').join('+');
    var context = this;
    var spotifyToken = this.props.spotifyToken;

     axios({
          method: 'GET',
          url: `/api/spotifyAPI/search?track=${query}`,
        })
          .then((response) => {
            var resp = response.data;
            context.setState({
              //showError: resp.tracks.items.length !== 0 ? false : true
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
            //context.addSearchResults(searchResults);
            this.setState({searchResults: searchResults});
            console.log('Search results from handleSongSubmit are', this.state.searchResults);

          })
          .catch(err => console.error(err, err));

  }

  render() {
    const { open, dimmer } = this.state

    return (
      <div style={{textAlign:'center'}}>
        <Button onClick={this.show(true)}>Edit your current MySong</Button>
        <Modal size='large'dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
            
            <div style={{backgroundColor: 'yellow'}}>
             <Input type='text' placeholder='Search for songs...' action onChange={this.handleSongSearch}>
               <input />
              <Button onClick={this.handleSongSubmit} type='submit'>Search</Button>
             </Input> 
            </div>

            <SearchResults searchResults={this.state.searchResults}/>

          </div>
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

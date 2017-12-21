import React, { Component } from 'react'
import { Button, Modal, Header, Input } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery';
import SearchResults from './SearchResults'
import CurrentSongSelection from './CurrentSongSelection'
import CurrentSongNote from './CurrentSongNote'

class MySongModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      //Property that closes and opens modal
      open: false,
      //Properties store note text value and results of song search
      noteData: this.props.currentMySong.note || '',
      searchResults: [],
      //Toggle conditional rendering of components
      showNote: false,

      //Properties of selected song
      trackName: this.props.currentMySong.trackName || '',
      trackArist: this.props.currentMySong.trackArtist || '',
      trackAlbum: this.props.currentMySong.trackAlbum || '',
      trackSummary: this.props.currentMySong.trackSummary || '',
      trackID: this.props.currentMySong.trackID || '',
      trackImage64: '',
      trackImage300: this.props.currentAlbumArtwork || '',
      
      //Currently selected song in modal
      selectedSong: {
        trackName: '',
        trackArtist: '',
        trackImage300: ''
      },
      //Toggle error message state properties
      showError: false,
      noSongSelectedError: false,
      noNoteError: false,
      noteTooLongError: false,
      songSearchValue: '',
  
    };
    
    this.handleCancel= this.handleCancel.bind(this);
    this.handleSave= this.handleSave.bind(this);

    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleSongSubmit = this.handleSongSubmit.bind(this);
    this.dataFormat = this.dataFormat.bind(this);
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.handleSongNoteChange = this.handleSongNoteChange.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.trackName !== this.props.currentMySong.trackName ) {
      this.setState({trackName: this.props.currentMySong.trackName, 
        noteData: this.props.currentMySong.note});
    }
  }


  show = dimmer => () => this.setState({ dimmer, open: true })

  handleSave () {
    console.log('save button pressed!', this.state.trackName, this.state.noteData);
    if (this.state.trackName === '' && this.state.noteData === '') {
      console.log('SAVE ERROR 1');
      this.setState({noSongSelectedError :true});
      this.setState({noNoteError: true});
      return;
    }

    if (this.state.trackName === '') {
      console.log('SAVE ERROR 2');
      this.setState({noSongSelectedError: true});
      this.setState({noNoteError :false});
      return;
    }

    if (this.state.noteData === '') {
      console.log('SAVE ERROR 3');
      this.setState({noNoteError :true});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData.length > 180) {
      console.log('SAVE ERROR 4');
      this.setState({noteTooLongError: true});
      this.setState({noNoteError :false});
      this.setState({noSongSelectedError: false});
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180 ) {
      console.log('SAVE SUCCESS ');
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
    this.setState({
      noNoteError :false,
      noSongSelectedError: false,
      noteTooLongError: false,
      open: false
    });
  }

  handleSongSearch(e) {
    e.preventDefault();
    this.setState({songSearchValue: e.target.value});
    
  }

  //function that shortens lengthy album, artist, and track names for optimal rendering on screen
  dataFormat(input) {
    var output = input.length > 90 ? input.substring(0,50) + '...' : input;
    return output;
  }

  handleSongSelection(song) {
    //create selectedSong object to pass into CurrentSongSelection component
    var selectedSong = {
      trackName: song.track_name,
      trackArtist: song.track_artist, 
      trackImage300: song.track_image300
    };

    //save selectedSong object into state, and also individual track attributes for flexible access
    this.setState({selectedSong: selectedSong, 
      trackSummary: song.track_summary, 
      trackName: song.track_name,
      trackID: song.track_id, 
      trackAlbum: song.track_album, 
      trackArtist: song.track_artist, 
    });
    
  }

  handleSongNoteChange(note){
    console.log('Note value is ', note);
    this.setState({noteData: note});
  }

  handleSongSubmit() {
    var query = this.state.songSearchValue.split(' ').join('+');
    var context = this;
    var spotifyToken = this.props.spotifyToken;

     axios({
          method: 'GET',
          url: `/api/spotifyAPI/search?track=${query}`,
        })
          .then((response) => {
            var resp = response.data;
            this.setState({
              showError: resp.tracks.items.length !== 0 ? false : true
            });
            var searchResults = [];
            for (var i = 0; i < resp.tracks.items.length; i++) {
              var result = {
                //relevant track info, using dataFormat function to shorten lengthy strings
                track_name: this.dataFormat(resp.tracks.items[i].name),
                track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
                track_artist: this.dataFormat(resp.tracks.items[i].artists[0].name),
                track_album: this.dataFormat(resp.tracks.items[i].album.name),
                track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name,
                //store both 64 px and 300 px album art
                track_image64: resp.tracks.items[i].album.images[2].url,
                track_image300: resp.tracks.items[i].album.images[1].url

              }
              searchResults.push(result);
            }
            this.setState({searchResults: searchResults});
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

          <div id="maincontainer"style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div id="top-half" style={{backgroundColor: 'white', width: '1080px', height:'100px'}}>
                <Input type='text' placeholder='Search for songs...' action onChange={this.handleSongSearch}>
                  <input />
                  <Button onClick={this.handleSongSubmit} type='submit'>Search</Button>
                </Input> 
            </div>

      
            <div id="bottom-half" style={{backgroundColor: 'black', display: 'flex', flexDirection: 'row', width: '1080px', height:'1000px'}}>
              <SearchResults showError={this.state.showError} handleSongSelection={this.handleSongSelection} searchResults={this.state.searchResults} />
              <div id="bottom-right" style={{backgroundColor: 'green', display: 'flex', flexDirection: 'column', width: '50%', height:'100%'}}>
                <CurrentSongSelection currentMySong={this.props.currentMySong} currentAlbumArtwork={this.props.currentAlbumArtwork} selectedSong={this.state.selectedSong} />
                <CurrentSongNote currentMySong={this.props.currentMySong} handleSongNoteChange={this.handleSongNoteChange} />
              </div>
            </div>

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

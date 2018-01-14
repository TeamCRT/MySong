import React, { Component } from 'react';
import { Button, Modal, Input, Label } from 'semantic-ui-react';
import axios from 'axios';
import SearchResults from './SearchResults';
import CurrentSongSelection from './CurrentSongSelection';
import CurrentSongNote from './CurrentSongNote';

class MySongModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Property that closes and opens modal
      open: false,
      // Properties store note text value and results of song search
      noteData: '',
      searchResults: [],
      // Toggle conditional rendering of components
      showNote: false, //eslint-line-disable
      // Properties of selected song
      trackName: '',
      trackArist: '',
      trackAlbum: '',
      trackSummary: '',
      trackID: '',
      trackImage64: '',
      trackImage300: '',
     
      // Currently selected song in modal
      selectedSong: {
        trackName: '',
        trackArtist: '',
        trackImage300: '',
      },
      // Toggle error message state properties
      showError: false,
      noSongSelectedError: false,
      noNoteError: false,
      noteTooLongError: false,
      songSearchValue: '',
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSongSearch = this.handleSongSearch.bind(this);
    this.handleSongSubmit = this.handleSongSubmit.bind(this);
    this.dataFormat = this.dataFormat.bind(this);
    this.handleSongSelection = this.handleSongSelection.bind(this);
    this.handleSongNoteChange = this.handleSongNoteChange.bind(this);
    this.handleEditMySongClick = this.handleEditMySongClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentMySong.trackID !== this.props.currentMySong.trackID) {
      const selectedSong = {
        trackName: this.props.currentMySong.trackName,
        trackArtist: this.props.currentMySong.trackArtist,
        trackImage300: this.props.currentMySong.trackImage300,
      };

      this.setState({trackName: this.props.currentMySong.trackName,  //eslint-disable-line
        trackArtist: this.props.currentMySong.trackArtist,
        trackAlbum: this.props.currentMySong.trackAlbum,
        trackSummary: this.props.currentMySong.trackSummary,
        trackID: this.props.currentMySong.trackID,
        trackImage300: this.props.currentMySong.trackImage300,
        noteData: this.props.currentMySong.note,
        selectedSong,
      });
    }
  }

  handleEditMySongClick() {
    const createdAt = this.props.currentMySong.createdAt; //eslint-disable-line
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
        if (time.data && !time.data.message) {
          const timeInSecs = Math.ceil(((time.data.waitPeriod - time.data.timeElapsed) / 1000));
          this.props.setWait(true, timeInSecs);
        } else {
          this.props.setWait(false);
          this.setState({ open: true });
        }
      });
  }

  handleSave() {
    if (this.state.trackName === '' && this.state.noteData === '') {
      this.setState({
        noSongSelectedError: true,
        noNoteError: true });
      return;
    }

    if (this.state.trackName === '') {
      this.setState({noSongSelectedError: true,
        noNoteError: false });
      return;
    }

    if (this.state.noteData === '') {
      this.setState({noNoteError :true,
        noSongSelectedError: false });
      return;
    }

    if (this.state.noteData.length > 180) {
      this.setState({
        noteTooLongError: true,
        noNoteError: false,
        noSongSelectedError: false,
      });
      return;
    }

    if (this.state.noteData !== '' && this.state.trackName !== '' && this.state.noteData.length <= 180) {
      this.setState({ noNoteError :false,
        noSongSelectedError: false,
        noteTooLongError: false,
      });
      const createdAt = this.props.currentMySong.createdAt; // eslint-disable-line
      const mySong = {
        trackSummary: this.state.trackSummary,
        trackID: this.state.trackID,
        trackAlbum: this.state.trackAlbum,
        trackName: this.state.trackName,
        trackArtist: this.state.trackArtist,
        trackImage300: this.state.trackImage300,
        note: this.state.noteData,
        createdAt,
      };
      const mySongPayload = {
        mySong,
        spotifyId: this.props.spotifyId,
      };

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

      this.props.twitter && axios.post('/api/twitter', mySongPayload)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    }
    console.log('new song saved!');
    this.setState({ open: false });
  }

  handleCancel() {
    const selectedSong = {
      trackName: this.props.currentMySong.trackName,
      trackArtist: this.props.currentMySong.trackArtist,
      trackImage300: this.props.currentMySong.trackImage300,
    };

    this.setState({
      noNoteError: false, //eslint-disable-line
      noSongSelectedError: false, //eslint-disable-line
      noteTooLongError: false, //eslint-disable-line
      open: false,
      trackName: this.props.currentMySong.trackName,
      trackArtist: this.props.currentMySong.trackArtist,
      trackAlbum: this.props.currentMySong.trackAlbum,
      trackSummary: this.props.currentMySong.trackSummary,
      trackID: this.props.currentMySong.trackID,
      trackImage300: this.props.currentMySong.trackImage300,
      noteData: this.props.currentMySong.note,
      selectedSong,
    });
  }

  handleSongSearch(e) {
    e.preventDefault();
    this.setState({ songSearchValue: e.target.value });
  }

  // function that shortens lengthy album, artist, and track names for optimal rendering on screen
  dataFormat(input) { // eslint-disable-line
    const output = input.length > 50 ? input.substring(0, 50) + '...' : input; // eslint-disable-line
    return output;
  }

  handleSongSelection(song) {
    // create selectedSong object to pass into CurrentSongSelection component
    const selectedSong = {
      trackName: song.track_name,
      trackArtist: song.track_artist,
      trackImage300: song.track_image300,
    };

    // save selectedSong object into state, and also individual track attributes for flexible access
    this.setState({
      selectedSong,
      trackSummary: song.track_summary,
      trackName: song.track_name,
      trackID: song.track_id,
      trackAlbum: song.track_album,
      trackArtist: song.track_artist,
      trackImage300: song.track_image300,
    });
  }

  handleSongNoteChange(note) {
    this.setState({
      noteData: note,
    });
  }

  handleSongSubmit() {
    const query = this.state.songSearchValue.split(' ').join('+');
    axios({
      method: 'GET',
      url: `/api/spotifyAPI/search?track=${query}`,
    })
      .then((response) => {
        const resp = response.data;
        this.setState({
          showError: resp.tracks.items.length === 0,
        });
        const searchResults = [];
        for (let i = 0; i < resp.tracks.items.length; i++) { // eslint-disable-line
          const result = {
          // relevant track info, using dataFormat function to shorten lengthy strings
            track_name: this.dataFormat(resp.tracks.items[i].name),
            track_id: resp.tracks.items[i].href.split('tracks')[1].substr(1),
            track_artist: this.dataFormat(resp.tracks.items[i].artists[0].name),
            track_album: this.dataFormat(resp.tracks.items[i].album.name),
            track_summary: resp.tracks.items[i].name + ' by ' + resp.tracks.items[i].artists[0].name, // eslint-disable-line
            // store both 64 px and 300 px album art
            track_image64: resp.tracks.items[i].album.images[2].url,
            track_image300: resp.tracks.items[i].album.images[1].url,
          };
          searchResults.push(result);
        }
        this.setState({ searchResults });
      });
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div className="my-song-modal" style={{ textAlign: 'center' }}>
        <Button onClick={this.handleEditMySongClick}>Edit your current MySong</Button>
        <Modal size="large" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Change your MySong</Modal.Header>

          <div id="maincontainer"style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div id="top-half" style={{ backgroundColor: 'white', width: '1080px', height: '100px' }}>
              <Input
                type="text"
                placeholder="Search for songs..."
                action
                onChange={this.handleSongSearch}
              >
                <input />
                <Button onClick={this.handleSongSubmit} type="submit">Search</Button>
              </Input>
            </div>
            <div
              id="bottom-half"
              style={{
               backgroundColor: 'black', display: 'flex', flexDirection: 'row', width: '1080px', height: '1000px',
              }}
            >
              <SearchResults
                showError={this.state.showError}
                handleSongSelection={this.handleSongSelection}
                searchResults={this.state.searchResults}
              />
              <div
                id="bottom-right"
                style={{
                  backgroundColor: 'green', display: 'flex', flexDirection: 'column', width: '50%', height: '100%',
                }}
              >
                <CurrentSongSelection
                  selectedSong={this.state.selectedSong}
                  noSongSelectedError={this.state.selectedSong.trackName === ''}
                />
                <CurrentSongNote
                  currentMySong={this.props.currentMySong}
                  handleSongNoteChange={this.handleSongNoteChange}
                  noNoteError={this.state.noNoteError}
                  noteTooLongError={this.state.noteTooLongError}
                />
              </div>
            </div>
          </div>

          <Modal.Actions>
            <Button color="black" onClick={this.handleCancel}>Cancel</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="OK"
              onClick={this.handleSave}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default MySongModal;

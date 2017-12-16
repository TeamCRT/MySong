/* eslint-disable no-console, react/prop-types */
import React from 'react';
import axios from 'axios';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.handleClick = this.handleClick.bind(this);
// <<<<<<< HEAD
    this.handleRemoveFollow = this.handleRemoveFollow.bind(this, this.props.follow.spotifyId);
// =======
    this.handleTrackClick = this.handleTrackClick.bind(this);
// >>>>>>> Play a song in following on click
  }
  handleClick() {
    this.setState({
      isVisible: !this.state.isVisible,
    });

    this.props.newPlaylistHandleClick(this.props.follow);
  }

  handleRemoveFollow(spotifyId) { // eslint-disable-line
    console.log('REMOVE FOLLLOW', spotifyId);
    axios.delete(`/api/removeFollow?removeSpotifyId=${spotifyId}`)
      .then((following) => {
        console.log('New following: ', following);
        this.props.getFollowing();
      })
      .catch((err) => {
        throw err;
      })
  }


  handleTrackClick() {
    axios({
      method: 'put',
      url: '/api/spotifyAPI/playSong',
      data: {
        uris: [`spotify:track:${this.props.follow.currentMySong.trackID}`],
      },
    })
      .then(() => {
        this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
      })
      .catch(err => {
        console.error(err);
        this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
      });
  }

  render() {
    return (
      <div>
        <Label onClick={this.handleClick} style={{ width: '100%', textAlign: 'center' }} color="red">
          {this.props.follow.mySongUsername}
          <Popup
            trigger={<Icon style={{ display: 'inline-block', float: 'right' }} size='large' onClick={this.handleRemoveFollow} name='close' />}
            content={`Stop following ${this.props.follow.mySongUsername}`}
            position='top center'
          />
        </Label>
        <Label style={{ width: '100%', textAlign: 'center' }} onClick={this.handleTrackClick}>
          {this.props.follow.currentMySong.trackName}
          <Popup
            trigger={<Icon style={{ display: 'inline-block', float: 'left' }} size='small' onClick={this.handleClick} name='expand' />}
            content='Show/Hide MySong note'
            position='top center'
          />
        </Label>
        {this.state.isVisible &&
          (
            <div>
              <Button>{this.props.follow.currentMySong.note}</Button>
            </div>
          )
        }
      </div>
    );
  }
}

export default Following;

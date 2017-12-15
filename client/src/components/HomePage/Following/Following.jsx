import React from 'react';
import { Button, Icon, Label, Popup, Segment } from 'semantic-ui-react';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.handleTrackClick = this.handleTrackClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveFollow = this.handleRemoveFollow.bind(this, this.props.follow.spotifyId);
  }
  handleClick(e) {
    this.setState({
      isVisible: !this.state.isVisible,
    });

    this.props.newPlaylistHandleClick(this.props.follow);
  }

  handleRemoveFollow(spotifyId) {
    console.log('REMOVE FOLLLOW', spotifyId);
    // axios.delete('/api/removeFollow', {spotifyId})
    //   .then
  }


  handleTrackClick() {
    this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
  }

  render(props) {
    return (
      <div>
        <Label style={{ width: '100%', textAlign: 'center' }} color="red">
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

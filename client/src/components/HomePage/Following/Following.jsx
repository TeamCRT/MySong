import React from 'react';
import { Button } from 'semantic-ui-react';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.handleTrackClick = this.handleTrackClick.bind(this);
  }
  handleClick() {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  handleTrackClick() {
    console.log('following track clicked:', this.props.follow.currentMySong.trackID);
    this.props.playFollowingTrack(this.props.follow.currentMySong.trackID);
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)} color="red">
          {this.props.follow.mySongUsername}
        </Button>
        {this.state.isVisible &&
          (
            <div>
              <Button onClick={this.handleTrackClick}>{this.props.follow.currentMySong.trackName}</Button>
              <Button>{this.props.follow.currentMySong.note}</Button>
            </div>
          )
        }
      </div>
    );
  }
}



export default Following;

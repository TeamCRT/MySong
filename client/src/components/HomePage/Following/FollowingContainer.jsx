import React from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import Following from './Following';

class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: null,
      spotifyId: null,
    };
  }

  getFollowing(spotifyId) {
    axios.post('/api/getFollowing', { spotifyId })
      .then((response) => {
        if (response.data[0]) { // if user has any followers, user could have none
          this.setState({
            spotifyId,
            following: response.data,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  mapFollowing(follow) {
    return (
      <Following
        follow={follow}
        playFollowingTrack={this.props.playFollowingTrack}
        onClick={this.props.handleFollowingClick}
        key={follow.mySongUsername}
      />
    );
  }
  render() {
    // the below statement limits the calls to the DB to retrieve following
    if (this.props.spotifyId && this.state.spotifyId !== this.props.spotifyId) {
      this.getFollowing(this.props.spotifyId);
    }
    return (
      <div style={{ float: 'right' }} >
        <Button.Group vertical >
          <Button disabled >Following</Button>
          {this.state.following &&
           this.state.following.map(this.mapFollowing.bind(this))
          }
        </Button.Group>
      </div>
    );
  }
}

export default FollowingContainer;

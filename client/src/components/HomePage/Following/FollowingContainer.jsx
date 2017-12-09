import React from 'react';
import { Button } from 'semantic-ui-react';
import Following from './Following';
import axios from 'axios';



class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: null,
      spotifyId: null,
    };
  }

  getFollowing(spotifyId) {
    if (spotifyId && spotifyId !== this.state.spotifyId) {
      axios.post('/api/following', { spotifyId })
        .then((response) => {
          if (response.data[0]) { // if user has any followers, user could have none
            this.setState({
              spotifyId,
              following: response.data[0].following,
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  }
  mapFollowing(follow) {
    return (
      <Following
        follow={follow}
        onClick={this.props.handleFollowingClick}
        key={follow.username}
      />
    );
  }
  render() {
    // if we have recieved a spotifyId and it is not the current user load following
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

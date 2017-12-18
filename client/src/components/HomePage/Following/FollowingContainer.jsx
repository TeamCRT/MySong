import React from 'react';
import { Label } from 'semantic-ui-react';
import axios from 'axios';
import Following from './Following';

class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: null,
      spotifyId: null,
    };
    this.getFollowing = this.getFollowing.bind(this);
    this.getFollowing();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.following && prevProps.following.length !== this.props.following.length) {
      this.getFollowing(this.props.spotifyId);
    }
  }

  getFollowing(spotifyId) {
    axios.get('/api/getFollowing', { spotifyId })
      .then((response) => {
        if (response.data[0]) { // if user has any followers, user could have none
          this.setState({
            spotifyId,
            following: response.data,
          });
        } else{
          // this.setState({
          //   following: null,
          // })
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
        newPlaylistHandleClick={this.props.newPlaylistHandleClick}
        handleRemoveFollow={this.props.handleRemoveFollow}
        getFollowing={this.getFollowing}
        spotifyId={this.props.spotifyId}
      />
    );
  }
  render() {
    return (
      <div>
        <Label.Group style={{ width: '100%' }}>
          <Label style={
            {
              borderRadius: '0px',
              posistion: 'sticky',
              width: '100%',
              textAlign: 'center',
              color: 'black',
              margin: 0,
            }
          }
          >
          Following
          </Label>
          <div style={
            {
              paddingBottom: '80px',
              maxHeight: '500px',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {this.state.following && this.state.following.map(this.mapFollowing.bind(this))}
          </div>
        </Label.Group>
      </div>
    );
  }
}

export default FollowingContainer;

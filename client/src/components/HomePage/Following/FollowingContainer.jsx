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
          this.props.refreshFollowing();
          this.setState({
            spotifyId,
            following: response.data,
          });
        } else {
          this.props.refreshFollowing();
          this.setState({
            following: null,
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
        newPlaylistHandleClick={this.props.newPlaylistHandleClick}
        handleRemoveFollow={this.props.handleRemoveFollow}
        getFollowing={this.getFollowing}
        spotifyId={this.props.spotifyId}
        view={this.props.view}
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
              position: 'sticky',
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
              maxHeight: '500px',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {this.state.following && this.state.following.map(this.mapFollowing.bind(this))}
            {this.state.following === null &&
              (<Label>
                You are not currently following anyone on MySong. In order to
                follow someone type their MySong Username into the search bar
                at the top of this page and select Follow. The selected user
                will then appear here and you will able to view their current
                MySong, play their current MySong and read their Note
              </Label>)
            }
          </div>
        </Label.Group>
      </div>
    );
  }
}

export default FollowingContainer;

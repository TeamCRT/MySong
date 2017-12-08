import React from 'react';
import { Button } from 'semantic-ui-react';
import Following from './Following';


class FollowingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: {},
    };
  }

  componentDidMount() {
    this.getFollowing();
  }

  getFollowing() {
    console.log('Current user spotifyID: ', this.props.spotifyId);
    return true;
  }
  render() {
    console.log('FOLLOWING CONTAINER MOUNTED');
    return (
      <div style={{ float: 'right' }} >
        <Button.Group vertical >
          <Button disabled style={{color:'black'}}>Following</Button>
          <Following onClick={this.props.handleFollowingClick}/>
        </Button.Group>
      </div>
    );
  }
}

export default FollowingContainer;

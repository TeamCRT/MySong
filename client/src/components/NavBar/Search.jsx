/* eslint-disable max-len */
import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Search } from 'semantic-ui-react';

let source = [
  /* ***********************************************************
  This is an example of the fields that can be displayed in the search
  dropdown, other fields can be stored on source entries, but they
  will not appear in the search dropdown
  *********************************************************** */
  // {
  //     "title": "Legros and Sons",
  //     "description": "Business-focused homogeneous local area network",
  //     "image": "https://s3.amazonaws.com/uifaces/faces/twitter/commadelimited/128.jpg",
  //     "price": "$5.91"
  //   },
];

class SearchExampleStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      following: [],
      openStatus: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const followingSpotifyIds = [];
    let newOptions = [];
    if (this.props.options && this.props.following.constructor === Array) {
      this.props.following.forEach((user) => {
        followingSpotifyIds.push(user.spotifyId);
      });
      newOptions = this.props.options.filter((user) => { // eslint-disable-line
        return !followingSpotifyIds.includes(user.spotifyid) && this.props.spotifyId !== user.spotifyid;
      });
    }
    if (prevProps.options.length !== newOptions.length) {
      source = newOptions;
      // this.handleSearchChange(null, '');
    }
  }

  resetComponent() { this.setState({ isLoading: false, results: [], value: '' }); }

  handleResultSelect(e, { result }) { this.setState({ value: result.title }); }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      console.log('this.state.value', this.state.value);
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);
      const results = _.filter(source, isMatch);
      results.unshift({
        title: 'closeButton',
      });
      this.setState({
        isLoading: false,
        following: [],
        results,
      });
      return true; // this is only here to satisfy ESLint
    }, 500);
  }

  handleFollowClick(e, { spotifyid }) { // eslint-disable-line
    axios.put('/api/addToFollowing', { spotifyId: spotifyid })
      .then(() => {
        const newFollowing = this.state.following.slice();
        newFollowing.push(spotifyid);
        this.setState({
          following: newFollowing,
        });
        this.props.refreshfollowing();
      })
      .catch((err) => {
        throw err;
      });
  }

  resultRenderer({ title, spotifyid }) { // eslint-disable-line
    let color = null;
    let text = 'Follow';
    let disable = false;
    if (this.state.following.includes(spotifyid)) {
      color = 'green';
      text = 'Following!';
      disable = true;
    }
    if (title === 'closeButton') {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button color={'red'} onClick={() => {this.setState({ openStatus: false, value: '' }); }}>Close Search</Button>
        </div>
      );
    }
    return (
      <div>
        {title}
        <Button disabled={disable} color={color} style={{ float: 'right' }} spotifyid={spotifyid} onClick={this.handleFollowClick}>{text}</Button>
      </div>
    );
  }

  render() {
    const {
      openStatus, isLoading, value, results,
    } = this.state;
    return (
      <Search
        onFocus={() => {
          this.setState({
              openStatus: true,
            });
        }}
        placeholder={'Find users to follow'}
        loading={isLoading}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        resultRenderer={this.resultRenderer}
        open={openStatus}
        showNoResults={false}
      />
    );
  }
}


export default SearchExampleStandard;

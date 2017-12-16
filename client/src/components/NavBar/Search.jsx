import _ from 'lodash';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Label, Search } from 'semantic-ui-react';

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
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.options.length !== this.props.options.length) {
      source = this.props.options;
    }
  }

  resetComponent() { this.setState({ isLoading: false, results: [], value: '' }); }

  handleResultSelect(e, { result }) { this.setState({ value: result.title }); }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
      return true; // this is only here to satisfy ESLint
    }, 500);
  }

  handleFollowClick(e, { spotifyid }) { // eslint-disable-line
    e.preventDefault();
    axios.put('/api/addToFollowing', { spotifyId: spotifyid })
      .then((data) => {
        console.log('Follow attempt: ', data);
        this.props.refreshfollowing();
      })
      .catch((err) => {
        throw err;
      });
  }

  resultRenderer({ title, spotifyid }) { // eslint-disable-line

    return (
      <div>
        <Label content={title} />
        <Button spotifyid={spotifyid} onClick={this.handleFollowClick}>Follow</Button>
      </div>
    );
  }

  render() {
    const { isLoading, value, results } = this.state;
    if (this.props.options !== '' && JSON.stringify(this.props.options) !== JSON.stringify(source)) {
      // this.props.options contains all users and is being passed down from Homepage
      source = this.props.options;
    }

    return (
      <Search
        placeholder={'Search for users to follow'}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        resultRenderer={this.resultRenderer}
        // {...this.props}
      />
    );
  }
}


export default SearchExampleStandard;

import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const options = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'German', text: 'German', value: 'German' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
]

const getOptions = () => {
  return options
}

class Search extends Component {
  componentWillMount() {
    this.setState({
      isFetching: false,
      multiple: true,
      search: true,
      searchQuery: null,
      value: [],
      options: [],
    })
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery })
  }

  setOptions = (options) => {
    var formatOptions = [];
    options.forEach((result) => {
      let formatResult = {};
      formatResult.text = result.mySongUsername;
      formatResult.key = result._id;
      formatOptions.push(formatResult)
    })
    console.log('formatted options : ', formatOptions );
    this.setState({ isFetching: true })

    setTimeout(() => {
      this.setState({ isFetching: false, options: formatOptions, value: ['hello'] })
    }, 500)
  }

  handleAddItem = () => {
    console.log('handle Add item');
  }
  toggleSearch = e => this.setState({ search: e.target.checked })

  searchUsers = (e, {value}) => {
    console.log('search fo users');
    axios.post('/api/searchUsers', { query: value })
    .then((results) => {
      console.log('SEARCH RESULTS: ', results.data);
      this.setOptions(results.data)
      // const newOptions = [];
      // const searchResult = {};
      // results.data.forEach((user) => {
      //   searchResult.text = user.mySongUsername;
      //   searchResult.key = user.mySongUsername;
      //   newOptions.push(searchResult);
      // });
      // return newOptions
      // this.setState({
      //   options: newOptions,
      //   // runOnce: false,
      // });
    })
    .catch((err) => {
      throw err;
    });
  }

  render() {
    const { multiple, options, isFetching, search, value } = this.state
    return (
      // <Dropdown
      //   options={this.state.options}
      //   search//={this.searchUsers.bind(this)}
      //   // allowAdditions
      //   // onAdditem={this.searchUsers.bind(this)}
      //   selection
      //   allowAdditions
      //   additionLabel='Custom Language: '
      //   value={currentValue}
      //   onAddItem={this.handleAddition}
      //   onChange={this.handleChange}
      //   // loading={this.state.loading}
      //   // placeholder="A custom message..."
      //   // noResultsMessage="Try another search."
      // />
        <Dropdown
            selection
            multiple={multiple}
            search={search}
            options={options}
            value={value}
            placeholder='Add Users'
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={isFetching}
            allowAdditions
            onAddItem={this.searchUsers.bind(this)}
          />
    );
  }
}

export default Search;

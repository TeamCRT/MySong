import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

  }

  searchUsers(options, query) {
    console.log('SEARCH QUERY: ', query);
    // axios.post('/api/searchUsers', {})
  }

  render() {
    return (
      <Dropdown
        options
        search={this.searchUsers}
        selection
        placeholder="A custom message..."
        noResultsMessage="Try another search."
      />
    );
  }
}

export default Search;

import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import SearchResult from './SearchResult'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
           <div >
                 {this.props.searchResults.map((result, index) => (
                  <SearchResult
                  result={result}
                  />))
                  }  
           </div>
    )
  }
}

export default SearchResults;
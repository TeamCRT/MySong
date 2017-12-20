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
                  <div style={{display: 'flex', flexDirection: 'row', 'justifyContent': 'stretch', backgroundColor: 'pink', maxWidth: '50%'}}>
                    <Label style={{borderRadius: '0px', flexGrow: '1', maxWidth: '70%', wordWrap: 'break-word' }}>Track
                    </Label>
                    <Label style={{borderRadius: '0px', minWidth: '30%' }}>Artist</Label>
                  </div>
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
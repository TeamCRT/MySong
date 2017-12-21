import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import SearchResult from './SearchResult'

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (

           <div id="search-results" style={{backgroundColor: '#575159', display: 'flex', flexDirection: 'column', width: '50%', height: '100%', flexGrow: '1'}} >
             <div id="searchresult1" style={{backgroundColor: 'black', display: 'flex', flexDirection: 'row', width: '100%', minHeight: '40.23px', maxHeight: '43.32px'}}>
               <Label id="track-header" style={{width: '60%', maxWidth: '60%', minWidth: '60%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black'}}>Track</Label>
               <Label id="artist-header" style={{width: '20%', maxWidth: '20%', minWidth: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black'}}>Artist</Label>
               <Label id="album-header" style={{width: '20%', maxWidth: '20%', minWidth: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black'}}>Album</Label>
             </div>
             {this.props.searchResults.map((result, index) => (<SearchResult result={result} />))}  
           </div>
    )
  }
}

export default SearchResults;



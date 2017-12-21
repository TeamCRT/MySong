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
             <div id="searchresult1" style={{backgroundColor: 'black', display: 'flex', flexDirection: 'row', width: '100%', minHeight: '43.32px', maxHeight: '43.32px'}}>
               <div id="track-header" style={{width: '60%', maxWidth: '60%', minWidth: '60%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black', padding: '.5em .5em'}}>Track</div>
               <div id="artist-header" style={{width: '20%', maxWidth: '20%', minWidth: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black', padding: '.5em .5em'}}>Artist</div>
               <div id="album-header" style={{width: '20%', maxWidth: '20%', minWidth: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: 'black', padding: '.5em .5em'}}>Album</div>
             </div>
             {this.props.searchResults.map((result, index) => (<SearchResult 
              handleSongSelection={this.props.handleSongSelection}
              result={result} />))}  
           </div>
    )
  }
}

export default SearchResults;



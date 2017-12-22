import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import SelectedSong from './SelectedSong'

class CreatedPlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '90%', maxHeight: '500px', overflow: 'scroll', minWidth: '100%', paddingTop: '.5em', backgroundColor: 'yellow'}}>
       {this.props.followObjectArray.map((result, index) => (
        <SelectedSong 
          result={result}
          mySongUsername={result.mySongUsername} 
          trackSummary={result.currentMySong.trackSummary}
          handleMinusClick={this.props.handleMinusClick} 
        />
        ))}
      </div>        
    )
  }
}


export default CreatedPlaylist;


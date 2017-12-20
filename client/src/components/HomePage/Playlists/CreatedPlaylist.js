import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import SelectedSong from './SelectedSong'

class CreatedPlaylist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
           <div style={{flexGrow: '4', height: '100%'}}>
                 {this.props.noSongsInPlaylistError && <Label style={{padding: '10px 10px'}} basic color='red' pointing='left'>No songs in playlist</Label>}
                  {this.props.followObjectArray.map((result, index) => (
                  <SelectedSong mySongUsername={result.mySongUsername} trackSummary={result.currentMySong.trackSummary} />
                 ))}
           </div>
    )
  }
}

export default CreatedPlaylist;
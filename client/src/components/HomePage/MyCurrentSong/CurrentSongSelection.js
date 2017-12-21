import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class CurrentSongSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onHandleClick = this.onHandleClick.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onHandleClick() {
    this.props.handleMinusClick(this.props.result);
  }

  onItemMouseEnter() {
    this.setState({
      hovering: true
    });
    
  }

  onItemMouseLeave() {
    this.setState({
      hovering: false
    })

  }

  handleClick() {
  	console.log('SearchResults click now detected!!', this.props.result.track_name);
  }

  render() {
    var color = this.state.hovering ? 'red' : '#575159';
    var cursor = this.state.hovering ? 'pointer' : 'default';
    
    return (
       <div id="song-selection" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#eff0f2', width: '100%', height:'50%', alignItems: 'center'}}>
        <div id="song-selection-bar" style={{backgroundColor: 'black', width: '100%', minHeight: '43.32px', maxHeight: '43.32px', color: 'white', fontSize: '28px', textAlign: 'center', padding: '0.2em 0.5em'}}>MySong</div>
        <img style={{padding: '2em 0 0 0'}} src="https://i.scdn.co/image/ead73f726959b82d78c41d28ca41edfef92b1c87"/>
        <div style={{fontSize: '40px', padding: '.5em 0 0 0'}}>Viva La Vida</div>
        <div style={{fontSize: '20px', padding: '5px .5px'}}>By Coldplay</div>
       </div>
    )
  }
}

export default CurrentSongSelection;
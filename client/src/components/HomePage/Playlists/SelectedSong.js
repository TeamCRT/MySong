import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label, Popup } from 'semantic-ui-react'

class SelectedSong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onHandleClick = this.onHandleClick.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    console.log('result is', this.props.result)
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

  render() {
    var color = this.state.hovering ? 'white' : 'grey';
    
    return (
       <div style={{display: 'flex', flexDirection: 'row', background: 'linear-gradient(black, #3e4147)', color: 'white', borderRadius: '10px', width: '100%', minHeight:'93px', marginTop: '20px', textAlign: 'center', padding: '1em 1em', flexWrap:'wrap'}}>
       <img src={this.props.result.currentMySong.trackImage300} height='65' />
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '.5em', justifyContent: 'center', flexGrow: '1'}}>
          <div style={{color:'white', textAlign: 'left', marginBottom: '.4em'}}>{this.props.result.currentMySong.trackName}</div>
          <div style={{color:'white', textAlign: 'left'}}>{`by ${this.props.result.currentMySong.trackArtist}`}</div>
        </div>
        <div style={{color: 'white', fontSize: '20px', wordWrap: 'break-word', maxWidth: '150px'}}>{this.props.mySongUsername}</div>
          <Popup
                    trigger= {<Icon
                      key='hello'
                      style={{ display: 'inline-block', float: 'right', padding: '0em 0.5em' }}
                      size="large"
                      name="minus circle"
                      color={color}
                      onClick={this.onHandleClick}
                      onMouseEnter={this.onItemMouseEnter}
                      onMouseLeave={this.onItemMouseLeave}
                    />}
                    content={`Remove ${this.props.mySongUsername}'s MySong from playlist`}
                    />




       </div>
    )
  }
}

export default SelectedSong;






import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label, Form, TextArea } from 'semantic-ui-react'

class CurrentSongNote extends React.Component {
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
       <div id="song-note" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#eff0f2', width: '100%', height:'50%', alignItems: 'center'}}>
         <Form>
           <TextArea placeholder='Write your song note here...' style={{ minHeight: 300, maxWidth: 400, fontSize: '35px', borderRadius: '40px' }} />
         </Form>
       </div>
    )
  }
}

export default CurrentSongNote;
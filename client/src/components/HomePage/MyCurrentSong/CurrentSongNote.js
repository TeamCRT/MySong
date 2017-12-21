import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label, Form, TextArea } from 'semantic-ui-react'

class CurrentSongNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    this.onChange = this.onChange.bind(this);

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

  onChange(e) {
    e.preventDefault();
    this.props.handleSongNoteChange(e.target.value);
  }

  render() {
    var color = this.state.hovering ? 'red' : '#575159';
    var cursor = this.state.hovering ? 'pointer' : 'default';
    
    return (
       <div id="song-note" style={{display: 'flex', flexDirection: 'column', backgroundColor: '#eff0f2', width: '100%', height:'50%', alignItems: 'center'}}>
         <Form>
           <TextArea onChange={this.onChange} placeholder='Write your song note here...' style={{ minHeight: 300, maxWidth: 400, fontSize: '35px', borderRadius: '40px' }} />
         </Form>
       </div>
    )
  }
}

export default CurrentSongNote;
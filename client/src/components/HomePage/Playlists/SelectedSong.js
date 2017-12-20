import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class SelectedSong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }

    this.onHandleClick = this.onHandleClick.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
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
    var color = this.state.hovering ? 'red' : 'green';
    
    return (
        <div style={{fontSize: '15px', wordWrap: 'break-word', padding: '5px', maxHeight: '500px',
                    overflow: 'scroll', overflowX: 'hidden'}}>
                   <Label style={{ borderRadius: '0px', width: '80%', textAlign: 'center'}} color='blue'>
                    {this.props.mySongUsername + '\'s MySong'}
                    <Icon
                      key='hello'
                      style={{ display: 'inline-block', float: 'right' }}
                      size="large"
                      name="minus circle"
                      color={color}
                      onClick={this.onHandleClick}
                      onMouseEnter={this.onItemMouseEnter}
                      onMouseLeave={this.onItemMouseLeave}
                    />
                   </Label>
                   <Label style={{ borderRadius: '0px', width: '80%', textAlign: 'center' }} color="yellow">
                    {this.props.trackSummary}
                   </Label>
      </div>
    )
  }
}

export default SelectedSong;
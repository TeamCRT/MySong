import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'

class SearchResult extends React.Component {
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
       <div style={{backgroundColor: 'brown', display: 'flex', flexDirection: 'row', width: '100%', height: '10%'}}>
         <Label style={{width: '60%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>{this.props.result.track_name}</Label>
         <Label style={{width: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>{this.props.result.track_artist}</Label>
         <Label style={{width: '20%', height: '100%', borderRadius: '0px', fontSize: '20px', textAlign: 'center', color: 'white', backgroundColor: '#575159'}}>{this.props.result.track_album}</Label>
       </div>
    )
  }
}

export default SearchResult;
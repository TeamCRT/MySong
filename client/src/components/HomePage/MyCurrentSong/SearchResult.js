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
    var color = this.state.hovering ? 'red' : '#575159';
    
    return (
       <div style={{backgroundColor: color, display: 'flex', flexDirection: 'row', width: '100%', minHeight: '64px', maxHeight: '64px'}}
       onMouseEnter={this.onItemMouseEnter}
       onMouseLeave={this.onItemMouseLeave}
       >
       	 <img src={this.props.result.track_image} />
         <div style={{width: '47.8%', maxWidth: '47.8%', minWidth: '47.8%', borderRadius: '0px', fontSize: '15px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word'}}>{this.props.result.track_name}</div>
         <div style={{width: '20%', maxWidth: '20%', minWidth: '20%', borderRadius: '0px', fontSize: '15px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word'}}>{this.props.result.track_artist}</div>
         <div style={{width: '20%', maxWidth: '20%', minWidth: '20%', borderRadius: '0px', fontSize: '12px', textAlign: 'center', padding: '1em 1em', color: 'white', backgroundColor: color, wordWrap: 'break-word'}}>{this.props.result.track_album}</div>
       </div>
    )
  }
}

export default SearchResult;
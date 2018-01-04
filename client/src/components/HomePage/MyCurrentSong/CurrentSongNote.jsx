import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

class CurrentSongNote extends React.Component {
  constructor(props) {
    super(props);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.handleSongNoteChange(e.target.value);
  }

  render() {
    return (
      <div
        id="song-note"
        style={{
          display: 'flex', flexDirection: 'column', backgroundColor: '#eff0f2', width: '100%', height: '50%', alignItems: 'center',
        }}
      >
        <Form>
          <TextArea
            onChange={this.onChange}
            placeholder="Write your song note here..."
            style={{
            minHeight: 300, maxWidth: 400, fontSize: '35px', borderRadius: '40px',
          }}
          >
            {this.props.currentMySong.note || ''}
          </TextArea>
        </Form>
      </div>
    );
  }
}
export default CurrentSongNote;

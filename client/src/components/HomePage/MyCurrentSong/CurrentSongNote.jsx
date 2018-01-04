import React from 'react';
import { Form, TextArea, Label } from 'semantic-ui-react';

class CurrentSongNote extends React.Component {
  constructor(props) {
    super(props);
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
          {this.props.noNoteError && <Label style={{ padding: '10px', fontSize: '20px' }} basic color="red" pointing="up">Please add a note</Label> ||
          this.props.noteTooLongError && <Label style={{ padding: '10px', fontSize: '20px' }} basic color="red" pointing="up">Note must be less than 180 characters</Label> }
        </Form>
      </div>
    );
  }
}
export default CurrentSongNote;

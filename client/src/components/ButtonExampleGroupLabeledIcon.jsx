import React from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const ButtonExampleGroupLabeledIcon = () => (
  <Button.Group vertical labeled icon>
    <Button icon='play' content='Play' />
    <Button icon='pause' content='Pause' />
    <Button icon='shuffle' content='Shuffle' />
  </Button.Group>
)

export default ButtonExampleGroupLabeledIcon
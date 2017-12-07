import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import piano from './playing-piano-wallpaper.jpg'

const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          <Button as='a'>Log in</Button>
        </Menu.Item>
        <Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.onClick = () => {
      window.location.href = 'http://127.0.0.1:3001/api/auth/spotify/';// eslint-disable-line
    }
  }

  render() {
    return (
      <div>
        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Contact Us</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted onClick={this.onClick}>Log in with Spotify
                    <Icon size='large' color='green' name='spotify' />
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as='h1'
                content='mysong'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
              />
              <Header
                as='h2'
                content='share your favorite song of the week. '
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
              <Header
                as='h2'
                content='listen to favorite songs from the people in your life.'
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
              <Header
                as='h2'
                content=' fully integrated with Spotify.'
                inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />

            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>Share Your Favorite Song</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Every week, you pick a MySong to share. We believe in the psychology of constraints - having to select just one song to share makes the song you share more meaningful.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>Listen To Favorite Songs</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Create playlists of MySongs from the people in your life. Engage in deeper interaction and dialogue with those you know, and discover new music.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src={piano}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

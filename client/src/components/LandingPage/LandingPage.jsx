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
import guitar from './guitar.jpg'
import phone from './phone.jpg'
import headphones from './headphones.jpg'

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
  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state

    return (
      <div>
        { visible ? <FixedMenu /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment 
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em', backgroundImage:`url(${headphones})`, backgroundSize:'cover' }}
            vertical
          >
            <Container >
              <Menu inverted pointing secondary size='large'>
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Contact Us</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted style={{fontSize:'15px'}}>Log in with Spotify
                    <Icon style={{marginLeft:'0.5em', marginBottom:'5px'}}size='big' color='green' name='spotify' />
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as='h1'
                content='mysong'
                inverted
                style={{ fontFamily:'Bungee', fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '.75em' }}
              />
              <Header
                as='h2'
                content='Share your favorite song of the week. '
                inverted
                style={{  fontFamily:'Rubik', fontSize: '1.75em', fontWeight: 'normal' }}
              />
              <Header
                as='h2'
                content='Listen to favorite songs from the people in your life.'
                inverted
                style={{ fontFamily:'Rubik', fontSize: '1.75em', fontWeight: 'normal' }}
              />
              <Header
                as='h2'
                content=' Fully integrated with Spotify.'
                inverted
                style={{ fontFamily:'Rubik', fontSize: '1.75em', fontWeight: 'normal' }}
              />
              
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontFamily: 'Baloo', fontSize: '2em' }}>Share Your Favorite Song</Header>
                <p style={{ fontFamily: 'Oxygen', fontSize: '1.33em' }}>
                  Every week, you pick a MySong to share. We believe in the psychology of constraints - having to select just one song to share makes the song you share more meaningful.
                </p>
                <Header as='h3' style={{ fontFamily: 'Baloo', fontSize: '2em' }}>Listen To Favorite Songs</Header>
                <p style={{ fontFamily: 'Oxygen', fontSize: '1.33em' }}>
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
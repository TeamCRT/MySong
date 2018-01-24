import React, { Component } from 'react'
// import axios from 'axios';
import {
  Button,
  Container,
  // Divider,
  Grid,
  Header,
  Icon,
  Image,
  // List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import piano from './playing-piano-wallpaper.jpg'
// import guitar from './guitar.jpg'
import phone from './phone.jpg'
import headphones from './headphones.jpg'
import carter from './carterduncan.jpeg'
import ross from './rosssalge.jpeg'
import tim from './timninan.jpeg'

// const FixedMenu = () => (
//   <Menu fixed='top' size='large'>
//     <Container>
//       <Menu.Item as='a' active>Home</Menu.Item>
//       <Menu.Item as='a'>Work</Menu.Item>
//       <Menu.Item as='a'>Company</Menu.Item>
//       <Menu.Item as='a'>Careers</Menu.Item>
//       <Menu.Menu position='right'>
//         <Menu.Item className='item'>
//           <Button as='a'>Log in</Button>
//         </Menu.Item>
//         <Menu.Item>
//           <Button as='a' primary>Sign Up</Button>
//         </Menu.Item>
//       </Menu.Menu>
//     </Container>
//   </Menu>
// )

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    }
    this.onClick = () => {
      window.location.href = 'http://127.0.0.1:3001/api/auth/spotify/';// eslint-disable-line
    }
    //this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
    }
  }

  render() {
    const { activeItem } = this.state;
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
            style={{ minHeight: 700, padding: '1em 0em', backgroundImage:`url(${headphones})`, backgroundSize:'cover' }}
            vertical
          >
            <Container >
              <Menu inverted pointing secondary size='large'>
                <Menu.Item as='a' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>Home</Menu.Item>
                <Menu.Item as='a'name='about' active={activeItem === 'about'} onClick={this.handleItemClick}>About</Menu.Item>
                <Menu.Item as='a' name='contact' active={activeItem === 'contact'} onClick={this.handleItemClick}>Contact Us</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted style={{fontSize:'15px'}} onClick={this.onClick}>Log in with Spotify
                    <Icon style={{marginLeft:'0.5em', marginBottom:'5px'}} size='big' color='green' name='spotify' />
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
      
            {this.state.activeItem==='home'&&<Container text >
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

            </Container>}

             {this.state.activeItem==='about'&&<Container text >
              <h2 style={{ fontFamily:'Rubik', fontSize: '3em', fontWeight: 'normal', color: 'white' }}>Developed By</h2>
              <Grid>
                <Grid.Row columns={3} style={{paddingTop: '4em', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px'}}>
                  <Grid.Column>
                    <Image style={{borderRadius: '200px'}} src='https://avatars3.githubusercontent.com/u/3308433?s=460&v=4' />
                    <Header
                      as='h2'
                      content='Carter Duncan'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '1.98em', fontWeight: 'normal' }}
                    />
                    <Header
                      as='h1'
                      content='Full Stack Software Engineer'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '1.30em', fontWeight: 'normal' }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Image style={{borderRadius: '200px'}} src='https://avatars1.githubusercontent.com/u/30704780?s=460&v=4' />
                    <Header
                      as='h2'
                      content='Ross Salge'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '2em', fontWeight: 'normal' }}
                    />
                     <Header
                      as='h1'
                      content='Full Stack Software Engineer'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '1.30em', fontWeight: 'normal' }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Image style={{borderRadius: '200px'}} src='https://avatars3.githubusercontent.com/u/29494494?s=460&v=4' />
                    <Header
                      as='h2'
                      content='Tim Ninan'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '2em', fontWeight: 'normal' }}
                    />
                     <Header
                      as='h1'
                      content='Full Stack Software Engineer'
                      inverted
                      style={{ fontFamily:'Rubik', fontSize: '1.30em', fontWeight: 'normal'}}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Container>}

                {this.state.activeItem==='contact'&&<Container text >
                  <h2
                  style={{fontFamily:'Rubik', fontSize: '3em', fontWeight: 'normal', color: 'white', paddingTop: '2em' }}
                  >Contact us with any questions or feedback at mysongteam@gmail.com</h2>
            </Container>}

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

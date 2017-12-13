const router = require('express').Router();
const axios = require('axios');
const User = require('../../db/model/user.js');
const path = require('path');
require('dotenv').config({ path: '../../env.env' });
const jwt = require('jwt-simple');
// const helpers = require('./helpers.js');
const passport = require('passport');/* http://www.passportjs.org/docs */
// const redirect = require('./redirect.html');

const secret = 'myappisawesome';
const HOME = 'http://127.0.0.1:3000';

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});

router.get('/me', (req, res) => {
  console.log('session data: ', req.session.token);
  // const token = req.headers.jwt;
  // const decoded = jwt.decode(token, secret);
  if (req.session) {
    res.status(200).json(req.session);
  } else {
    res.redirect(HOME);
  }
});

// see https://github.com/jmperez/passport-spotify#readme for passport
// spotify OAuth strategy
router.get(
  '/auth/spotify',
  passport.authenticate(
    'spotify',
    {
      scope: [
        'user-read-email',
        'user-read-private',
        'user-follow-read',
        'user-modify-playback-state',
        'user-read-playback-state',
        'playlist-modify-public',
        'playlist-modify-private',
      ],
      showDialog: true,
      failureRedirect: 'http://127.0.0.1:3000',
    },
  ),
);
// spotify OAuth callback for authorization process
router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: 'http://127.0.0.1:3000' }),
  (req, res) => {
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    const user = req.user;
    const token = jwt.encode(user, secret);
    const session = req.session;
    session.token = token;
    // Successful authentication, redirect home.
    // res.set({ authorization: token });
    // axios.defaults.headers.common.jwt = token;
    // res.redirect(302, 'http://localhost:3000/home/'+req.user.spotifyId+'&token=' + token);
    res.sendFile(path.join(__dirname + '/index.html'));
  },
);

router.get(
  '/playlists',
  (req, res) => {
    User.getUserPlaylists(req.query.spotifyUserID)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.get(
  '/aplaylist',
  (req, res) => {
    User.getAPlaylist(req.query.spotifyUserId, req.query.spotifyPlaylistURI, req.query.playlistName)
      .then((result) => {
        User.populateAPlaylist(result[0].playlists[0].songsArrayBySpotifyUserID)
          .then((response) => {
            res.send(response);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch(err => res.send(err));
  },
);

//new endpoint created
router.post(
  '/aplaylist',
  (req, res) => {
    console.log('POST to /aplaylist detected!');
    User.createPlaylist(req.body.spotifyId, req.body.newPlaylist)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.post(
  '/getFollowing',
  (req, res) => {
    User.getFollowing(req.body.spotifyId)
      .then((result) => {
        // INPUT: array of spotifyIds OUTPUT: object containing mySongUsername
        // and CurrentSong for each spotifyId
        User.populateFollowing(result[0].following)
          .then((populatedFollowing) => {
            res.send(populatedFollowing);
          })
          .catch((err) => {
            res.send(err);
          });
        // res.send('Getting nothing back for populate folowing');
      })
      .catch(err => res.send(err));
  },
);


router.get('/currentmysong/:spotifyId', (req, res) => {
  const spotifyId = req.params.spotifyId;
  User.getCurrentSong(spotifyId)
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.post('/currentmysong', (req, res) => {
  const spotifyId = req.body.spotifyId;
  const mySong = req.body.mySong;

  User.changeCurrentSong(spotifyId, mySong)
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.put('/addToFollowing', (req, res) => {
  const token = req.session.token;
  const decoded = jwt.decode(token, secret);
  User.getFollowing(decoded.spotifyId)
    .then((result) => {
      const userFollowing = result[0].following;
      const following = userFollowing.map((follow) => { // eslint-disable-line
        return follow.spotifyId;
      });
      if (!following.includes(req.body.spotifyId) && decoded.spotifyId !== req.body.spotifyId) {
        User.addToFollowing(decoded.spotifyId, req.body.spotifyId)
          .then(added => res.send(added))
          .catch(err => res.send(err));
      } else {
        res.send('Already following user');
      }
    })
    .catch(err => res.send(err));
});

router.delete('/deleteSession', (req, res) => {
  req.session.destroy();
  res.send('User logged out');
});

router.get(
  '/getAllUsers',
  (req, res) => {
    User.search(req.body.query)
      .then((users) => {
        res.send(users);
      })
      .catch(err => res.send(err));
  },
);


module.exports = router;

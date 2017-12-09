const router = require('express').Router();
const User = require('../../db/model/user.js');
require('dotenv').config({ path: '../../env.env' });
var jwt = require('jwt-simple');
// const helpers = require('./helpers.js');

const passport = require('passport');/* http://www.passportjs.org/docs */
var secret = 'myappisawesome';

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});

// retrieve the current user from the session
router.get('/getUser', (req, res) => {
  console.log('Testing to see the current session', req.session);
  res.send({/*req.session.passport.user*/});
});

router.get('/me', (req, res) => {

  var token = req.headers.jwt;
  var decoded = jwt.decode(token, secret);
  console.log('user is ', decoded);
  res.status(200).json(decoded);
});

router.get('/search', (req, res) => {
  
  var token = req.headers.jwt;
  var decoded = jwt.decode(token, secret);
  console.log('user is ', decoded);
  res.status(200).json(decoded);
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
      successRedirect: '/',
      failureRedirect: '/login',
    },
  ),
);
// spotify OAuth callback for authorization process
router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify'),
  (req, res) => {
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    // console.log('TESTING ############', req.user);
    console.log('the auth spotify callback endpoint is being called');
    var user = req.session.passport.user;
    var token = jwt.encode(user, secret);
    //res.status(200).json(token);
    // console.log('Session data: ', req.session.passport)
    // Successful authentication, redirect home.
    res.set({ 'authorization': token});
    res.redirect(302, 'http://localhost:3000/home/'+req.user.spotifyId + 'token=' + token);
  },
);

router.get(
  '/playlists',
  (req, res) => {
    console.log('GET received to /api/playlists');
    User.getUserPlaylists('1234369600')
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.post(
  '/following',
  (req, res) => {
    User.getFollowing(req.body.spotifyId)
      .then(result => res.send(result))
      .catch(err => res.send(err));
    // res.send('sent from /playlists POST');
  },
);

module.exports = router;

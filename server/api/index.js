const router = require('express').Router();
const User = require('../../db/model/user.js');
require('dotenv').config({ path: '../../env.env' });
// const helpers = require('./helpers.js');

const passport = require('passport');/* http://www.passportjs.org/docs */

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
    req.session.save((err) => {
      if (err) {
        throw err;
      }
    });
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    // console.log('TESTING ############', req.user);
    req.session.user_id = 'test'; // eslint-disable-line
    // console.log('Session data: ', req.session.passport)
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/home/'+req.user.spotifyId);
  },
);

module.exports = router;

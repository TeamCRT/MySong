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
  res.send({/*req.session.passport.user*/});
});

router.get('/me', (req, res) => {

  var token = req.headers.jwt;
  var decoded = jwt.decode(token, secret);
  console.log('\nuser is ', decoded);
  res.status(200).json(decoded);
});

router.get('/search', (req, res) => {

  var token = req.headers.jwt;
  var decoded = jwt.decode(token, secret);
  console.log('\n\nuser is ', decoded);
  res.status(200).json(decoded);
});

router.get('/baz', (req, res) => {
  console.log('baz endpoint reached!!', req.headers);
  res.status(200).json('yeah!!');
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
  passport.authenticate('spotify',{ failureRedirect: 'http://127.0.0.1:3000'}),
  (req, res) => {
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    const user = req.user;
    const token = jwt.encode(user, secret);
    // Successful authentication, redirect home.
    res.set({ 'authorization': token});
    res.redirect(302, 'http://localhost:3000/home/'+req.user.spotifyId + 'token=' + token);
  },
);

router.get(
  '/playlists',
  (req, res) => {
    console.log('\n\nGET received to /api/playlists\n');
    User.getUserPlaylists('1234369600')
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.get(
  '/aplaylist',
  (req, res) => {
    console.log('\n\nGET received to /api/aplaylist\n');
    User.getAPlaylist('1234369600', 'spotify:user:1234369600:playlist:2ckdrIQHqvnDT2fkMc6GOR')
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


router.get('/currentmysong/:spotifyId', (req, res) => {
  console.log('GET request to /currentmysong recieved!');
  console.log('the req.params.spotifyId is ', req.params.spotifyId);

  var spotifyId = req.params.spotifyId;
  User.getCurrentSong(spotifyId)
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.post('/currentmysong', (req, res) => {
  console.log('POST request to /currentmysong recieved');
  console.log('req.body is ', req.body);
  var spotifyId = req.body.spotifyId;
  var mySong = req.body.mySong;

  User.changeCurrentSong(spotifyId, mySong)
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.put(
  '/addToFollowing',
  (req, res) => {
    const token = req.headers.jwt;
    const decoded = jwt.decode(token, secret);
    console.log('DECODED JWT inside /addToFollowing: ', decoded.spotifyId);
    User.getFollowing("121440509")
      .then((result) => {
        console.log('follwoing: ', result[0].following);
        const following = result[0].following.map((follow) => {
          return follow.spotifyId;
        })
        console.log("GET USER FOLLWOING and put following ids into array: ", following);
        res.send(result)
      })
      .catch(err => res.send(err));
    // User.addToFollowing(decoded.spotifyId, req.body.spotifyId)
    //   .then(result => res.send(result))
    //   .catch(err => res.send(err));
    // res.send(decoded)
  },
);


router.post(
  '/searchUsers',
  (req, res) => {
    User.search(req.body.query)
      .then((users) => {
        res.send(users);
      })
      .catch(err => res.send(err));
  },
);


module.exports = router;

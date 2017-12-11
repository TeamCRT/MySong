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
  passport.authenticate('spotify', { failureRedirect: 'http://127.0.0.1:3000' }),
  (req, res) => {
    // req.user contains the data sent back from db/passport.js SpotifyStrategy
    const user = req.user;
    const token = jwt.encode(user, secret);
    // Successful authentication, redirect home.
    res.set({ authorization: token });
    res.redirect(302, 'http://localhost:3000/home/'+req.user.spotifyId + 'token=' + token);
  },
);

router.get(
  '/playlists',
  (req, res) => {
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
  '/getFollowing',
  (req, res) => {
    console.log('REQUEST FOLLOWING FOR: ', req.body.spotifyId);
    User.getFollowing(req.body.spotifyId)
      .then((result) => {
        console.log('RESULT FROM GET FOLLOWING: ', result[0].following);
        // INPUT: array of spotifyIds OUTPUT: object containing mySongUsername
        // and CurrentSong for each spotifyId
        User.populateFollowing(result[0].following)
          .then((populatedFollowing) => {
            console.log('INDEX.JS/API POPULATED FOLLOWING: ', populatedFollowing);
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
  },
);


router.post(
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

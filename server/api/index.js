const router = require('express').Router();
const axios = require('axios');
const User = require('../../db/model/user.js');
const path = require('path');
require('dotenv').config({ path: '../../env.env' });
const keys = require('./keys');
const jwt = require('jwt-simple');
const $ = require('jquery');
// const btoa = require('btoa');
// const helpers = require('./helpers.js');
const passport = require('passport');/* http://www.passportjs.org/docs */
// const redirect = require('./redirect.html');
const Twitter = require('twitter');
const secret = 'myappisawesome';
const HOME = 'http://127.0.0.1:3000';

router.use('/spotifyAPI/:id', (req, res, next) => {
  let currentTimeAndDate = new Date();
  currentTimeAndDate = Date.parse(currentTimeAndDate);
  let tokenExpiration = Date.parse(req.session.tokenExpirationDate);
  let compare = currentTimeAndDate - tokenExpiration;
  if (compare > 3000000) { // 3000000, number of miliseconds in 50 mins
    const refreshToken = req.session.passport.user.spotifyRefreshToken;
    axios({
      method: 'post',
      url: `https://accounts.spotify.com/api/token?refresh_token=${refreshToken}&grant_type=refresh_token`,
      headers: { Authorization: process.env.SPOTIFY_BASE64}
    })
      .then((response) => {
        req.session.test = Math.random();
        const timeAndDate = new Date();
        req.session.passport.user.spotifyToken = response.data.access_token;
        req.session.tokenExpirationDate = timeAndDate;
        next();
      })
      .catch((err) => {
        console.log('REFRESH TOKEN ERROR: ', err);
        next(err);
      });
    // next();
  } else {
    next();
  }
});

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});


router.get('/me', (req, res) => {
  const saveToken = req.session.passport.user.spotifyToken;
  User.getUser(req.session.passport.user.spotifyId)
    .then((user) => {
      req.session.passport.user.playlists = user.playlists;
      req.session.passport.user.following = user.following;
      req.session.passport.user.currentMySong = user.currentMySong;
      req.session.passport.user.mySongUsername = user.mySongUsername;
      if (req.session) {
        res.status(200).json(req.session);
      } else {
        res.redirect(HOME);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
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
    // console.log('User for passport session \n', req.session.passport.user, '\n\n')

    const token = jwt.encode(user, secret);
    const session = req.session;
    session.token = token;
    const timeAndDate = new Date();
    session.tokenExpirationDate = timeAndDate;
    // Successful authentication, redirect home.
    // res.set({ authorization: token });
    // axios.defaults.headers.common.jwt = token;
    // res.redirect(302, 'http://localhost:3000/home/'+req.user.spotifyId+'&token=' + token);
    res.sendFile(path.join(__dirname + '/index.html'));
  },
);

// twitter OAuth using passport
router.get('/auth/twitter', passport.authorize('twitter-authz'));
// twitter OAuth callback

User.changeCurrentSong = (spotifyId, mySong) => {
  return User.update(
    { spotifyId: spotifyId },
    {
      $set: {
        currentMySong: mySong,
      }
    }
  ).exec()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('error is ', err);
      return err;
    })
};


router.get('/auth/twitter/callback', passport.authorize('twitter-authz'), (req, res) => {
    console.log('twitter req.account:', req.account);
    const spotifyId = req.session.passport.user.spotifyId;
    console.log('spotify id is:', spotifyId);
       User.findOne({spotifyId: spotifyId}).then((currentUser) => {
            if(currentUser.twitterAccessTokenKey){
                // already have this user
                console.log('user already has twitterAccessTokenKey: ', currentUser.twitterAccessTokenKey);
            } else {
                // if not, create add twitterAccessToken information to user in database
              User.update(
                { spotifyId: spotifyId },
                {
                  $set: {
                    twitterAccessTokenKey: req.account.accessTokenKey,
                    twitterAccessTokenSecret: req.account.accessTokenSecret
                  }
                }
              ).exec()  
            }
        });
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get(
  '/playlists',
  (req, res) => {
    User.getUserPlaylists(req.session.passport.user.spotifyId)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.get(
  '/aplaylist',
  (req, res) => {
    User.getAPlaylist(req.query.spotifyUserId, req.query.playlistName)
      .then((result) => {
        const songsArrayBySpotifyUserID = result[0].playlists[0].songsArrayBySpotifyUserID;
        User.populateAPlaylist(songsArrayBySpotifyUserID)
          .then((response) => {
            const fullResponse = {
              DBResponse: response,
              songsArrayBySpotifyUserID,
            };
            res.send(fullResponse);
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
    User.createPlaylist(req.body.spotifyId, req.body.newPlaylist)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);
//update a playlist endpoint
router.put(
  '/aplaylist',
  (req, res) => {
    var originalName = req.body.originalName;
    var updatedPlaylist = req.body.newPlaylist;
    var spotifyId = req.body.spotifyId;

    User.updatePlaylist(spotifyId, originalName, updatedPlaylist)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
);

router.get(
  '/getFollowing',
  (req, res) => {
    User.getFollowing(req.session.passport.user.spotifyId)
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

router.delete('/removeFollow', (req, res) => {
  User.removeFollow(req.session.passport.user.spotifyId, req.query.removeSpotifyId)
    .then((newFollowing) => {
      res.send(newFollowing);
    })
    .catch((err) => {
      console.log('REMOVEFOLLOW ERROR: ', err);
      res.send(err);
    });
});

router.delete('/deletePlaylist', (req, res) => {
  User.deletePlaylist(req.session.passport.user.spotifyId, req.query.playlistName)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log('DELETE PLAYLIST ERROR: ', err);
      res.send(err);
    });
});


router.get('/currentmysong/:spotifyId', (req, res) => {
  const spotifyId = req.params.spotifyId;
  User.getCurrentSong(spotifyId)
    .then(result => res.status(200).json(result))
    .catch(err => res.send(err));
});

router.post('/currentMySongWaitTime', (req, res) => {
  console.log('/currentMySongWaitTime endpoint reached!');
  const mySong = req.body;
  console.log('mySong:', mySong);
  let currentTimeAndDate = new Date();
  currentTimeAndDate = Date.parse(currentTimeAndDate);
  if (!mySong.createdAt) {
    console.log('No Created At - my', mySong);
    const message = 'no createdAt';
    res.json({ message });
  } else {
    const mySongExpiration = Date.parse(mySong.createdAt);
    const gracePeriod = 2000;
    const waitPeriod = 10000;
    const timeElapsed = currentTimeAndDate - mySongExpiration;
    console.log('timeElapsed, waitPeriod: ', timeElapsed + ' ' + waitPeriod);
    if (timeElapsed > waitPeriod || timeElapsed < gracePeriod) {
      res.send(false);
    } else {
      res.json({ timeElapsed, waitPeriod });
    }
  }
});

router.post('/currentmysong', (req, res) => {
  const spotifyId = req.body.spotifyId;
  let mySong = req.body.mySong;
  mySong.createdAt = new Date();
  User.changeCurrentSong(spotifyId, mySong)
    .then(result => res.status(200).json(mySong))
    .catch(err => res.send(err));
});

router.post('/twitter', (req, res) => {
  console.log('/api/twitter endpoint reached!');
  console.log('twitter consumer secret is', keys.twitter.consumerKey);

  const client = new Twitter({
    consumer_key: 'Y61TAiKhk8y7n6rroloFzMCcN',
    consumer_secret: 'U9gDRaWA0IMf4BcGlkxoGJegDnCeAOa2MZtfNeHnipDABWeQsA',
    access_token_key: '951844182599061507-0eTWGOqkF93lSTGr5WKK7vM5sn3mD7a',
    access_token_secret: '4osbYKRWF4v8FBAGvTDU7gDHBJoDSA71QctQjOjCZEFlw'
  });

  client.post('statuses/update', {status: `MySong for the week: ${req.body.mySong.trackSummary}`},  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body. 
    console.log(response);  // Raw response object. 
  });

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
    User.getAllUsers()
      .then((users) => {
        res.send(users);
      })
      .catch(err => res.send(err));
  },
);

router.post(
  '/spotifyAPI/createPlaylist',
  (req, res) => {
    const URIArray = req.body.songURIs;
    const spotifyUserID = req.body.spotifyUserID;
    const token = req.session.passport.user.spotifyToken;
    console.log('token is ', token);
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${spotifyUserID}/playlists`,
      data: {
        name: req.body.playlistName,
        description: (new Date()).toString().substring(0,10),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const playlistid = response.data.id;
        axios({
          method: 'put',
          url: `https://api.spotify.com/v1/users/${spotifyUserID}/playlists/${playlistid}/tracks`,
          data: {
            uris: URIArray,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(success => res.send(success))
          .catch(err => err);
      })
      .catch(err => err);
  },
);

router.put(
  '/spotifyAPI/playSong',
  (req, res) => {
    const token = req.session.passport.user.spotifyToken;
    axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      data: {
        uris: req.body.uris,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((success) => { res.send(success); })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  },
);

router.get(
  '/spotifyAPI/albumArtwork',
  (req, res) => {
    const token = req.session.passport.user.spotifyToken;
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${req.query.trackID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((success) => {
        const imageData = success.data.album.images;
        res.send(imageData);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
);




router.get(
  '/spotifyAPI/search',
  (req, res) => {
    console.log('spotify search for tracks endpoint reached ************************************');
    const token = req.session.passport.user.spotifyToken;
    axios({ 
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${req.query.track}&type=track&market=US&limit=15&offset=0`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((success) => {
        res.send(success.data);

      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
);

module.exports = router;

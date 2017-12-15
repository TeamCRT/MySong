const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('./model/user.js');
require('dotenv').config({ path: '../../env.env' });


module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3001/api/auth/spotify/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // check to see if the user already exists in the db
      User.findOne({ spotifyId: profile.id }, (err, user) => { // eslint-disable-line
        if (err) {
          return done(err);
        }
        // if user already exists then return their stored info
        if (user) {
          const existingUser = Object.assign({}, user._doc);// eslint-disable-line
          existingUser.spotifyToken = accessToken;
          return done(null, existingUser);
        }
        const newUser = new User();
        newUser.spotifyId = profile.id;
        newUser.spotifyUsername = profile.username;
        newUser.spotifyDisplayName = profile.displayName;
        newUser.spotifyEmail = profile._json.email; // eslint-disable-line
        newUser.spotifyRefreshToken = refreshToken;
        newUser.currentMySong = {
          trackSummary: '',
          trackID: '',
          trackAlbum: '',
          trackName: '',
          trackArtist: '',
          note: '',
        };
        if (profile.displayName) {
          newUser.mySongUsername = profile.displayName;
        } else {
          // if user has no Spotify Display Name then use their spotifyId
          newUser.mySongUsername = profile.id;
        }
        newUser.following = [];
        newUser.save((err1) => {
          if (err1) {
            throw err1;
          }
          // don't need to store accessToken into DB, only need refreshToken
          newUser.spotifyToken = accessToken;
          return done(null, newUser);
        });
      });
    },
  ));
};

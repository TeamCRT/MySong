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
      console.log('############################################################');
      console.log('Spotify accessToken: ', accessToken);
      console.log('Spotify refreshToken: ', refreshToken);
      console.log('Spotify profile: ', profile);

      User.findOne({ spotifyId: profile.id }, (err, user) => { // eslint-disable-line
        if (err) {
          return done(err);
        }
        // Check to see if there is already a user with provided username
        if (user) {
          return done(null, user);
        }
        const newUser = new User();
        newUser.spotifyId = profile.id;
        newUser.spotifyUsername = profile.username;
        newUser.spotifyDisplayName = profile.displayName;
        newUser.spotifyEmail = profile._json.email; // eslint-disable-line
        newUser.spotifyToken = accessToken;
        newUser.spotifyRefreshToken = refreshToken;
        newUser.save((err1) => {
          if (err1) {
            throw err1;
          }
          return done(null, newUser);
        });
      });
    },
  ));
};

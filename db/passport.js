const LocalStrategy = require('passport-local').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('./model/user.js');
require('dotenv').config({ path: '../../env.env' });


module.exports = (passport) => {
  // Local Signup Strategy
  passport.use('local-signup', new LocalStrategy(
    { // http://www.passportjs.org/docs/login/ for more info
      usernameField: 'username', // I don't think this field is necessary
      passwordField: 'password', // I don't think this field is necessary
      passReqToCallback: true, // req will be passed as the first argument to the verify callback
    },
    (req, username, password, done) => { // this is the verify callback mentioned above
      // Check to see if there is already a user with provided username
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        } else if (user) {
          return done('username is already taken');
        }
        const newUser = new User();
        // Set the user's local credentials
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        // Save the user
        newUser.save((err1) => {
          if (err1) {
            throw err1;
          }
          return done(null, newUser);
        });
        return true;
      });
    },
  ));
  passport.use(new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3001/api/auth/spotify/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Spotify accessToken: ', accessToken);
      console.log('Spotify refreshToken: ', refreshToken);
      console.log('Spotify profile: ', profile);


      // User.findOrCreate(
      //   { spotifyId: profile.id },
      //   (err, user) => done(err, user),
      // );
      return done(null, accessToken);
    },
  ));
};

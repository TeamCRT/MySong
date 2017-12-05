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
<<<<<<< HEAD
<<<<<<< HEAD
        return true;
      });
=======
      console.log('Username: ', username, ' Password: ', password);
      return done(null, password);
      // User.findOne({ username }, (err, user) => {
      //   console.log('Inside db/passport.js User.findOne');
      //   if (err) {
      //     return done(err);
      //   } else if (user) {
      //     return done('username is already taken');
      //   }
      //   const newUser = new User();
      //   // Set the user's local credentials
      //   newUser.username = username;
      //   newUser.password = newUser.generateHash(password);
      //   // Save the user
      //   newUser.save((err1) => {
      //     if (err1) {
      //       throw err1;
      //     }
      //     return done(null, newUser);
      //   });
      //   return true;
      // });
>>>>>>> Local sign up is being passed through passport correctly
    },
  ));
  passport.use('spotify', new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/spotify/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('SpotifyStrategy check');
      User.findOrCreate(
        { spotifyId: profile.id },
        (err, user) => {
          return done(err, user);
        },
      );
    },
  ));
};

// Local Login strategy
// const localLogin = passport.use('local-login', new LocalStrategy(
//   { // http://www.passportjs.org/docs/login/ for more info
//     usernameField: 'username', // I don't think this field is necessary
//     passwordField: 'password', // I don't think this field is necessary
//     passReqToCallback: true, // req will be passed as the first argument to the verify callback
//   },
// function(req, username, password, done) {
//   User.findOne({ 'username': username }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     // If user is not found:
//     if (!user) {
//       return done('username not found.');
//     }
//     // If user is found but the provided password is incorrect:
//     if (!user.validPassword(password)) {
//       return done('loginMessage', 'Incorrect username/password.');
//     }
//     // If username and password are corret, return successfully
//     return done(null, user);
//   })
// }));
//
// module.exports = {
//   localSignup,
//   // localLogin,
// };
  },
  (username, password, done) => { // this is the verify callback mentioned in line 10
    // Check to see if there is already a user with provided username
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      } else if (user) {
        return done('username is already taken');
      }
      // If user is not found:
      if (!user) {
        return done('username not found.');
      }
      // If user is found but the provided password is incorrect:
      if (!user.validPassword(password)) {
        return done('loginMessage', 'Incorrect username/password.');
      }
      // If username and password are corret, return successfully
      return done(null, user);
    })
  }))
}
>>>>>>> Still setting up passport

const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/user.js');

module.exports = (passport) => {
  // Local Signup Strategy
  passport.use('local-signup', new LocalStrategy(
    { // http://www.passportjs.org/docs/login/ for more info
      usernameField: 'username', // I don't think this field is necessary
      passwordField: 'password', // I don't think this field is necessary
      passReqToCallback: true, // req will be passed as the first argument to the verify callback
    },
    (username, password, done) => { // this is the verify callback mentioned above
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

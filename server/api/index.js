const router = require('express').Router();
const User = require('../../db/model/user.js');
// const helpers = require('./helpers.js');

const passport = require('passport');/* http://www.passportjs.org/docs */

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});

router.get('/me', (req, res) => {
  console.log('Getting me');
  res.send({});
});
// see https://github.com/jmperez/passport-spotify#readme for passport
// spotify OAuth strategy
router.get(
  '/auth/spotify',
  passport.authenticate('spotify', { showDialog: true }),
  (req, res) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  },
);

router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

// add new user
/* Example POST data
{
  "username": "newuser",
  "password": (hashed via bcrypt)
}
*/
router.post(
  '/signup',
  (req, res, next) => {
    passport.authenticate(
      'local-signup',
      (err, user) => {
        if (err) {
          return next(err);
        }
        console.log('successful passport authenticate: ', user);
        res.send({ user });
        return true;
      },
    )(req, res, next);
  },
);


module.exports = router;

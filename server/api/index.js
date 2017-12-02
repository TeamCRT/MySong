const router = require('express').Router();
const User = require('../../db/model/user.js');
const helpers = require('./helpers.js');

const passport = require('passport');/* http://www.passportjs.org/docs */

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({ users });
  });
});

var test = 0;

// add new user
/* Example POST data
{
  "username": "newuser",
  "password": (hashed via bcrypt)
}
*/
router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      res.status(401).send({ err });
    } else {
      req.session.user_id = user._id;
      // user.email = req.body.email
      // create a default list for the new user
  })(req, res);
});


module.exports = router;

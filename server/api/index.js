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
  // var user_id = req.session.user_id;
  // helpers.getUserById(user_id)
  // .then((user) => {
  //   res.send(user);
  // })
  // .catch((err) => {
  //   res.send({});
  // });
  res.send({});
});

// add new user
/* Example POST data
{
  "username": "newuser",
  "password": (hashed via bcrypt)
}
*/
router.post('/signup', (req, res) => {
  console.log('Inside server/api post signup: ', req.body);
  passport.authenticate('local-signup', (err, user) => {
    console.log('Passport authenticate user: ', user);
    if (err) {
      res.status(401).send({ err });
    }
    res.send('This is a response from server/api/index.js .post /signup: ', user);
    // req.session.user_id = user._id;
    // user.email = req.body.email
    // create a default list for the new user
  });
  console.log('after passport authenticate');
    }
    res.send('This is a response from server/api/index.js .post /signup: ', user);
    // req.session.user_id = user._id;
    // user.email = req.body.email
    // create a default list for the new user
  });
>>>>>>> Starts the process of testing passport config, install axios as a dependency
});


module.exports = router;

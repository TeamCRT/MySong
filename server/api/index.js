const router = require('express').Router();
const User = require('../../app/models/user');

const helpers = require('./helpers');
const passport = require('passport');/* http://www.passportjs.org/docs */


//get all users
//We actually won't need this for our app, but good for testing db
router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({users})
  })
})
//get all users in the DB
router.get('/allUsers'), (req, res) => {
  helpers.getAllUsers()
  .then((users) => {
    res.status(201).send(users)
  })
}

//get user
router.get('/users/:username', (req, res) => {
  var loggedInUserId = req.session.user_id;
  //we want to send in the logged in user's id
  //so we can determine if we should send back secret wishlists
  helpers.getUser(req.params.username, loggedInUserId)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(401).send({err});
  })
})

//add new user
/* Example POST data
{
	"username": "newuser",
	"password": (hashed via bcrypt)
}
*/
router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      res.status(401).send({err: err});
    } else {
      req.session.user_id = user._id;
      // user.email = req.body.email
      //create a default list for the new user
      helpers.createList({
        title: 'Wishlist',
        secret: false,
        user_id: user._id
      })
      .then((list) => {
        //get the user again which should now have the wishlist
        return helpers.getUserById(user._id);
      })
      .then((user) => {
        user.email = req.body.email.toLowerCase()
        user.firstName = req.body.firstName.toLowerCase()
        user.lastName = req.body.lastName.toLowerCase()
        user.profilePicURL = req.body.profilePicURL
        return user.save()
      })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(401).send({err});
      });
    }
  })(req, res);
});

//user login
/* Example POST data
{
	"username": "newuser",
	"password": (hashed via bcrypt)
}
*/
router.post('/login', (req, res) => {

  passport.authenticate('local-login', (err, user) => {
    if (err) {
      res.status(401).send({err: err});
    } else {
      req.session.user_id = user._id;
      res.send(user);
      helpers.getUserById(user._id)
    }
  })(req, res);
});

//Logs the user out by clearing the session
router.get('/logout', (req, res) => {
  delete req.session.user_id;
  res.send('success')
});

//Sends back the logged in user's info
//We use this in the react app
router.get('/me', (req, res) => {
  console.log('Getting me');
  var user_id = req.session.user_id;
  helpers.getUserById(user_id)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.send({});
  });
});



module.exports = router;

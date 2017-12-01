//somthing in it
const router = require('express').Router();
const User = require('../../db/model/user.js');

const passport = require('passport');/* http://www.passportjs.org/docs */

router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({users})
  })
})

module.exports = router;

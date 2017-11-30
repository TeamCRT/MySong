const User = require('../../app/models/user');

const getUserById = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findById(user_id)
    .select('-password') //don't send back password
    .populate({ //gets nested items
      path: 'wishlists',
      model: 'List',
      populate: {
        path: 'items',
        model: 'Item'
      }
    })
    .exec()
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('user does not exist');
      }

      resolve(user);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUser = (username, loggedInUserId) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
    .select('-password') //don't send back password
    .populate({ //gets nested items
      path: 'wishlists',
      model: 'List',
      populate: {
        path: 'items',
        model: 'Item'
      }
    })
    .exec()
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('user does not exist');
      }

      //Only return secret wishlists if user is owner
      if (loggedInUserId == user._id) {
        resolve(user);
      } else {
        //If user is not owner filter out the secret wishlists
        let publicWishlists = user.wishlists.filter((wishlist) => {
          return wishlist.secret === false;
        });
        user.wishlists = publicWishlists;
        resolve(user);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({})
    .select('-password') //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('no users');
      } else {
        resolve(user);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUserByUsername = (username) => {
  var RE = new RegExp(username, 'i');
  console.log('User search by username:', username, ' RegExp:', RE);
  return new Promise((resolve, reject) => {
    User.find( {username: RE} )
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUsers) => {
      resolve(foundUsers)
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUserByName = (userFullName) => {
  var allNames = userFullName.split(' ')
  if(allNames.length === 1) {
    //if user only inputs one word, search both first and last name with it
    var user = {
      firstName: new RegExp(allNames[0], 'i'),
      lastName: new RegExp(allNames[0], 'i')
    };
  } else if (allNames.length === 0) {
    //if user search is empty populate with empty strings to avoid error
    var user = {
      firstName: '',
      lastName: ''
    };
  } else {
    //take first word to be firstName and last word to be lastName(ignires middle names)
    var user = {
      firstName: new RegExp(allNames[0], 'i'),
      lastName: new RegExp(allNames[allNames.length-1], 'i')
    };
  }

  return new Promise((resolve, reject) => {
    var allUsers = [];
    // var RE = new RegExp(userFullName, 'i');
    User.find({ $or: [ {firstName: user.firstName}, {lastName: user.lastName} ]})
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUsers) => {
      console.log('foundUsers', foundUsers)
      resolve(foundUsers);
      })
    })
    .catch((err) => {
      console.log('err in getUserByName', err)
      reject(err);
    })
};

const getUserByEmail = (email) => {
  var RE = new RegExp(email, 'i');
  console.log('User search by email: ', email, ' RegExp:', RE);
  return new Promise((resolve, reject) => {
    email = email.toLowerCase()
    User.find({email: RE})
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUser) => {
      resolve(foundUser)
    })
    .catch((err) => {
      reject(err);
    })
  })
};

module.exports = {
  getUserById,
  getAllUsers,
  getUser,
  getUserByName,
  getUserByUsername,
  getUserByEmail,
}

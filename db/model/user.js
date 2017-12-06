const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({

  id: {
    type: String,
    unique: true,
    required: true,
  },

  username: {
    type: String,
    unique: true,
    required: true,
  },

  displayName: String,

  // password: {
  //   type: String,
  //   required: true,
  // },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  spotifyToken: {
    type: String,
    unique: true,
    required: true,
  },

  spotifyRefreshToken: {
    type: String,
    unique: true,
    required: true,
  },

  currentSong: {
    songSpotifyId: String,
    note: String,
    songTitle: String,
    songArtist: String,
    songAlbum: String,
  },

  following: {
    // use format <user_id>: {}
  },

  playlists: {
    // use format <playlistName>: [user_id, user_id]
  },

});

const User = mongoose.model('user', userSchema);

module.exports = User;

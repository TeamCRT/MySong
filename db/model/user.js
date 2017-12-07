const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  spotifyId: {
    type: String,
    unique: true,
    required: true,
  },

  spotifyUsername: {
    type: String,
    unique: true,
    required: true,
  },

  spotifyDisplayName: String,

  // password: {
  //   type: String,
  //   required: true,
  // },

  spotifyEmail: {
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

User.getUserPlaylists = spotifyUserId => (
  User.find({ spotifyId: spotifyUserId }, { 'playlists.playlistName': 1, 'playlists.spotifyID': 1 }).exec()
    .then(response => response)
    .catch(err => err)
);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  spotifyToken: String,

  spotifyRefreshToken: String,

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

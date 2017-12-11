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

  currentMySong: {
    trackSummary: String,
    trackID: String,
    trackAlbum: String,
    trackName: String,
    trackArtist: String,
    note: String
  },

  following: {
    type: Array,
  },

  playlists: {
    type: Array,
  },
  mySongUsername: {
    type: String,
  },

});

const User = mongoose.model('user', userSchema);

User.getUserPlaylists = spotifyUserId => (
  User.find({ spotifyId: spotifyUserId }, { 'playlists.playlistName': 1, 'playlists.spotifyPlaylistID': 1, 'playlists.spotifyURI': 1 }).exec()

);

User.getAPlaylist = (spotifyUserId = '1234369600', spotifyPlaylistURI = 'spotify:user:1234369600:playlist:2ckdrIQHqvnDT2fkMc6GOR') => (
  User.find(
    {
      spotifyId: spotifyUserId,
    },
    {
      playlists: { $elemMatch: { spotifyURI: spotifyPlaylistURI } }
    }
  )
);

User.createPlaylist = (spotifyUserId, newPlaylistName = 'test') => (
  User.update(
    { spotifyId: spotifyUserId },
    {
      $push:
        {
          playlists:
            {
              playlistName: newPlaylistName,
              spotifyPlaylistID: 'test',
              spotifyPlaylistURI: 'test',
              songsArray: [],
            }
        }
    }
  )
);

User.getFollowing = spotifyId => (
  User.find({ spotifyId }).select('following').exec()
    .then(res => res)
    .catch(err => err)
);

User.getCurrentSong = (spotifyId) => (
  User.find({ spotifyId }).select('currentMySong').exec()
    .then(res => res)
    .catch(err => err)
);

User.changeCurrentSong = (spotifyId, mySong) => {
  console.log('spotifyId is ', spotifyId);
  console.log('mySong is ', mySong);
  
  return User.update(
    { spotifyId: spotifyId },
    {
      $set: {
        currentMySong: mySong,
      }
    }
  ).exec()
    .then((res) => {
      console.log('res is ', res);
      return res;
    })
    .catch((err) => {
      console.log('error is ', err);
      return err;
    })
};

module.exports = User;

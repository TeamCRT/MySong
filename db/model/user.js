const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  mySongUsername: {
    type: String,
    required: true,
  },

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
    note: String,
  },

  following: {
    type: Array,
  },

  playlists: [
    {
      playlistName: String,
      spotifyPlaylistID: String,
      spotifyPlaylistURI: String,
      songsArrayBySpotifyUserID: Array,
    },
  ],

});

const User = mongoose.model('user', userSchema);

User.getUserPlaylists = spotifyUserId => (
  User.find({ spotifyId: spotifyUserId }, { 'playlists.playlistName': 1, 'playlists.spotifyPlaylistID': 1, 'playlists.spotifyPlaylistURI': 1 }).exec()

);

User.getAPlaylist = (spotifyUserId, spotifyPlaylistURI, playlistName) => (
  User.find(
    {
      spotifyId: spotifyUserId,
    },
    {
      playlists: { $elemMatch: { playlistName: playlistName } },
    },
  )
);

User.populateAPlaylist = userArray => (
  User.find(
    { spotifyId: { $in: userArray } },
    { spotifyId: 1, currentMySong: 1 },
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
              songsArrayBySpotifyUserID: [],
            }
        }
    }
  )
);

User.getFollowing = (spotifyId) => {
  return User.find({ spotifyId }).select('following').exec()
    .then(res => res)
    .catch(err => err);
};

User.getCurrentSong = (spotifyId) => (
  User.find({ spotifyId }).select('currentMySong').exec()
  .then(res => res)
  .catch(err => err)
);


User.populateFollowing = (following) => {
  const followingIds = following.map((follow) => { // eslint-disable-line
    return follow.spotifyId;
  });
  return User.find({ spotifyId: { $in: followingIds } }).select('spotifyId mySongUsername currentMySong').exec()
};

User.addToFollowing = (currentUserId, idToAdd) => (
  User.findOneAndUpdate(
    { spotifyId: currentUserId },
    { $push: { following: { spotifyId: idToAdd } } },
  ).exec()
    .then(res => res)
    .catch(err => err)
);

User.changeCurrentSong = (spotifyId, mySong) => {
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

User.search = query => (
  User.find({}, 'mySongUsername spotifyId').exec()
    .then(users => users)
    .catch(err => err)
);

module.exports = User;

import React from 'react';

const CurrentPlaylistSong = props => (
  <div className="current-playlist-song">
    <div className="artwork">
      <iframe
        title={`${props.user}Iframe`}
        src={`https://open.spotify.com/embed?uri=spotify:track:${props.trackObj.trackID}`}
        frameBorder="0"
        height="80"
        width="80"
      />
    </div>
    <div className="song-info">
      <div>
        <h3>{`${props.user}'s song: ${props.trackObj.trackName}`}</h3>
        <div>{`Artist: ${props.trackObj.trackArtist}`}</div>
        <div>{`Album: ${props.trackObj.trackAlbum}`}</div>
        <div>{`Note: ${props.trackObj.note}`}</div>
      </div>
    </div>
  </div>
);

export default CurrentPlaylistSong;

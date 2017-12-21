import React from 'react';

const CurrentPlaylistSong = props => (
  <div className="current-playlist-song">
    <h3 className="userName">{props.user}</h3>
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
        <h3>{props.trackObj.trackName}</h3>
        <div>{`Artist: ${props.trackObj.trackArtist}`}</div>
        <div>{`Album: ${props.trackObj.trackAlbum}`}</div>
      </div>
    </div>
    <div className="note">{props.trackObj.note}</div>
  </div>
);

export default CurrentPlaylistSong;
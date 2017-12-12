import React from 'react';
import CurrentPlaylist from './CurrentPlaylist';

const MainContainer = props => (
  <div>
    <CurrentPlaylist
      currentPlaylistObj={props.currentPlaylistObj}
      spotifyUserId={props.spotifyUserId}
    />
  </div>
);

export default MainContainer;

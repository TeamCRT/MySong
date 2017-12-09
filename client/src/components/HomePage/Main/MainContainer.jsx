import React from 'react';
import CurrentPlaylist from './CurrentPlaylist';

const MainContainer = props => (
  <div>
    <CurrentPlaylist
      currentPlaylistObj={props.currentPlaylistObj}
    />
  </div>
);

export default MainContainer;

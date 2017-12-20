import React from 'react';

// Fetch what user is currently listening to, set that context as URI?
// If user is not currently listening, set URI to something on page?

const BottomPlayer = props => (
  <iframe
    className="bottom-player"
    title="bottomPlayerIframe"
    src={`https://open.spotify.com/embed?uri=${props.URI}`}
    width="100%"
    height="80"
    frameBorder="0"
  />

);

export default BottomPlayer;

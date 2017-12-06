import React from 'react';

// Fetch what user is currently listening to, set that context as URI?
// If user is not currently listening, set URI to something on page?

const URI = 'spotify:user:1234369600:playlist:2ckdrIQHqvnDT2fkMc6GOR';

const BottomPlayer = () => (
  <iframe
    title="bottomPlayerIframe"
    src={`https://open.spotify.com/embed?uri=${URI}`}
    width="100%"
    height="80"
    frameBorder="0"
    allowTransparency="true"
    style={{ position: 'absolute', bottom: 0 }}
  />

);

export default BottomPlayer;

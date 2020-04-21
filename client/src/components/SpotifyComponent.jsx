import React from 'react';
import ReactModal from 'react-modal';

import CSSModules from 'react-css-modules';
import styles from './SpotifyComponent.css';


// class SpotifyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
   
//     };
//   }
  

  

//   render() {
//     return (
//       <div className="container">Playlist</div>
//     )
//   }
// }

const SpotifyComponent = (props) => {


  const clickCreatePlaylist = () => {
    props.createPlaylist('P L . a i')
  }

  if (props.list.length) {
    let playlist = props.list.map((album, i) => {
      console.log('list album', album)
      return (
        <div className="playlistItem" key={i}>
          <img src={album.album.images[2].url} className="image"/>
          <div className="text">
            <div >{album.album.name}</div>
            <div>{album.album.artists[0].name}</div>
          </div>
        </div>
      )
    })

    return (
      <div className="container">
        {playlist}
        <div className="bottomBanner">
          <button className="button" onClick={clickCreatePlaylist}>CREATE PLAYLIST</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="spotifyLanding">
        <p>Select Albums</p>
        <p>from collection to add to your</p>
        <p>playlist</p>
      </div>
      
    </div>
  )
};


export default SpotifyComponent;
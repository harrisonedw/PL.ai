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
    props.createPlaylist('testList2')
  }

  if (props.list.length) {
    let playlist = props.list.map((album, i) => {
      console.log('list album', album)
      return (
        <div className="playlistItem" key={i}>
          <img src={album.album.images[2].url} />
          <div className="listItem">{album.album.name}</div>
          <div>{album.album.artists[0].name}</div>
        </div>
      )
    })

    return (
      <div className="container">
        <button onClick={clickCreatePlaylist}>CREATE PLAYLIST</button>
        {playlist}
      </div>
    )
  }

  return (
    <div className="container">empty</div>
  )
};


export default SpotifyComponent;
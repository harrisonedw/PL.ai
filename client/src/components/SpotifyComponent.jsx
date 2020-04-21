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
      return (
        <div key={i} className="listItem">{album.title}</div>
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
import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './DiscogsCollection.css';


class DiscogsCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
 
  }


  render() {
    const collection = this.props.collection;
    const albums = collection.map((album, i) => {
      return (<div  key={i}>
        <img className="album" src={album.basic_information.cover_image} alt="album art"/>
      </div>)
    })
    return (
      <div>
        <ul>
        {albums}
        </ul>
      </div>
    )
  }
}


export default DiscogsCollection;
import React from 'react';

class DiscogsCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
 
  }


  render() {
    const collection = this.props.collection;
    const albums = collection.map((album, i) => {
      return (<div key={i}>
        <img src={album.basic_information.cover_image} alt="album art"/>
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
import React from 'react';
import ReactModal from 'react-modal';

import CSSModules from 'react-css-modules';
import styles from './DiscogsCollection.css';


class DiscogsCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
    // console.log('click')
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  

  render() {
    const collection = this.props.collection;
    const albums = collection.map((album, i) => {
      {console.log(album)}
      return (<div  key={i}>  
        <img className="album" src={album.basic_information.cover_image} alt="album art" onClick={this.openModal}/>
      </div>)
    })
    return (
      <div>
        <div className="collection">
          {albums}
        </div>
        <ReactModal
          className="TP-modal"
          isOpen={this.state.showModal}
        >
          <div onClick={this.closeModal} className="TP-modalContent">
            <p>its a modal</p>
          </div>
        </ReactModal>
      </div>
    )
  }
}


export default DiscogsCollection;
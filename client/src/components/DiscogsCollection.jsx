import React from 'react';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip'

import CSSModules from 'react-css-modules';
import styles from './DiscogsCollection.css';

import AddToListControl from './AddToListControl.jsx'


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
      let tooltipId = album.basic_information.title;
      return (
        <div  key={i}>  
          <img data-tip data-for={tooltipId} className="album" src={album.basic_information.cover_image} alt="album art" onClick={this.openModal}/>
          <ReactTooltip id={tooltipId} effect="float" clickable="true" offset="{'top': -10}">
            <AddToListControl albumInfo={album.basic_information} addToList={this.props.addToList}/>
          </ ReactTooltip>
        </div>
      )
    })
    return (
      <div>
        <div className="collection">
          {albums}
        </div>
      </div>
    )
  }
}


export default DiscogsCollection;
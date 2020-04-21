import React from 'react';
import ReactModal from 'react-modal';

import CSSModules from 'react-css-modules';
import styles from './DiscogsCollection.css';

const AddToListControl = (props) => {


  // add function needs to
  //// find artist on spotify then
  //// find album on spotify then
  //// return songs in album
  //// give them to spotify component
  const clickButton = (event) => {
    props.addToList(props.albumInfo);
  } 
  
  return (
    <div>
      <div>{props.albumInfo.artists[0].name}</div>
      <div>{props.albumInfo.title}</div>
      <div>{props.albumInfo.year}</div>
      <div>{props.albumInfo.genres[0]}</div>
      <button className="button" onClick={clickButton}>ADD</button>
    </div>
  )
}

export default AddToListControl;
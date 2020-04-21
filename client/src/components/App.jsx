import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import ReactModal from 'react-modal';
import DiscogsCollection from './DiscogsCollection.jsx';
import SpotifyComponent from './SpotifyComponent.jsx';
import PlaylistCreated from './PlaylistCreated.jsx';

import CSSModules from 'react-css-modules';
import styles from './App.css';
// import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discogsUser: '',
      discogsCollection: [],
      stage: 0,
      playlist: [],
      showModal: false,
    };
    this.getDiscogsCollection = this.getDiscogsCollection.bind(this);
    this.handleDiscogsInput = this.handleDiscogsInput.bind(this);
    this.handleDiscogsSubmit = this.handleDiscogsSubmit.bind(this);
    this.addToList = this.addToList.bind(this);
    this.createSpotifyPlaylist = this.createSpotifyPlaylist.bind(this);
    this.playlistDone = this.playlistDone.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  playlistDone() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  getDiscogsCollection(user) {
    console.log(user)
    $.get(`/api/collection/${user}`)
      .done((data) => {
        this.setState({ discogsCollection: data.releases, stage: 1 })
      })
    }
  
  connectToSpotify() {
    axios.get('/login')
      .then((data) => {
        console.log('connected to spotify')
      })
  }
  
  createSpotifyPlaylist(name) {
    console.log('create playlist clicked')
    axios.post(`/api/playlist/create/${name}`, this.state.playlist)
      .then(() => {
        console.log('created playlist');  
        this.playlistDone();
      })
      .catch(() => {
        console.log('cant create playlist');
      })
  }

  handleDiscogsInput(event) {
    this.setState({ discogsUser: event.target.value });
  }
    
  handleDiscogsSubmit(event) {
    console.log('called')
    let user = this.state.discogsUser;
    this.getDiscogsCollection(user);
    event.preventDefault();
  }

  addToList(albumInfo) {
    let info = {
      artist: albumInfo.artists[0].name,
      title: albumInfo.title
    }
    axios.get(`api/search/${info.artist}/${info.title}`)
      .then((data) => {
        // console.log('album', data)
        let currentList = this.state.playlist
        currentList.push(data.data);
        this.setState({ playlist: currentList });
      })
  }


  render() {
    if (this.state.stage === 0) {
      return (
        <div>
          <div className="topBanner">PL.ai</div>
          <div className="landing">
            <p>Welcome to PL.ai !!</p>
            <p>Enter a Discogs user below and see their collection!</p>
            {/* <button onClick={this.connectToSpotify}>CONNECT TO SPOTIFY</button> */}
            <div className="discogsInput">
              <form>
                <label>
                  <input className="inputForm" type="text" name="user" onChange={this.handleDiscogsInput} />
                </label>
                <input className="button" type="submit" value="Submit" onClick={this.handleDiscogsSubmit}/>
              </form>
            </div>
          </div>
            <div className="bottomBanner">
              <p></p>
              <img className="discogsLogo" src="https://plaimvp.s3-us-west-1.amazonaws.com/discogs+logo+white.png" alt=""/>
              <img className="spotifyLogo" src="https://plaimvp.s3-us-west-1.amazonaws.com/Spotify_Logo_CMYK_Green.png" alt=""/>

            </div>
        </div>
      )
    }
    if (this.state.stage === 1) {
      return (
        <div>
          <div className="topBanner">PL.ai</div>

          <div className="main">
            <DiscogsCollection collection={this.state.discogsCollection} addToList={this.addToList}/>
            <SpotifyComponent list={this.state.playlist} createPlaylist={this.createSpotifyPlaylist}/>
          </div>
          <div className="bottomBanner">
              <p></p>
              <img className="discogsLogo" src="https://plaimvp.s3-us-west-1.amazonaws.com/discogs+logo+white.png" alt=""/>
              <img className="spotifyLogo" src="https://plaimvp.s3-us-west-1.amazonaws.com/Spotify_Logo_CMYK_Green.png" alt=""/>
          </div>
          <ReactModal
            className="modal"
            isOpen={this.state.showModal}
          >
            <div onClick={this.closeModal} className="modalContent">
              <PlaylistCreated />
            </div>
        </ReactModal>
        </div>
      )
    }

    return (
      <div>
        <p>testing</p>
      </div>
    )
  }
}

export default App;
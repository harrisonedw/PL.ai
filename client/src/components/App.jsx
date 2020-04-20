import React from 'react';
import $ from 'jquery';

import DiscogsCollection from './DiscogsCollection.jsx'
import SpotifyComponent from './SpotifyComponent.jsx'

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
    };
    this.getDiscogsCollection = this.getDiscogsCollection.bind(this);
    this.handleDiscogsInput = this.handleDiscogsInput.bind(this);
    this.handleDiscogsSubmit = this.handleDiscogsSubmit.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  getDiscogsCollection(user) {
    console.log(user)
    $.get(`/api/collection/${user}`)
      .done((data) => {
        this.setState({ discogsCollection: data.releases, stage: 1 })
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
    let currentList = this.state.playlist
    currentList.push(info);
    this.setState({ playlist: currentList });
  }


  render() {
    if (this.state.stage === 0) {
      return (
        <div>
          <form>
            <label>
              Enter Discogs User:
              <input type="text" name="user" onChange={this.handleDiscogsInput} />
            </label>
            <input type="submit" value="Submit" onClick={this.handleDiscogsSubmit}/>
          </form>
        </div>
      )
    }
    if (this.state.stage === 1) {
      return (
        <div className="main">
          <DiscogsCollection collection={this.state.discogsCollection} addToList={this.addToList}/>
          <SpotifyComponent list={this.state.playlist}/>
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
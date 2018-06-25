import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

//instructions say to 'copy contents of script tag' - but there are multiple...is that a problem?
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZD-XBeBUsyE0ijFKRMK_itLV6mFi4GfI",
  authDomain: "bloc-chat-c9fa9.firebaseapp.com",
  databaseURL: "https://bloc-chat-c9fa9.firebaseio.com",
  projectId: "bloc-chat-c9fa9",
  storageBucket: "bloc-chat-c9fa9.appspot.com",
  messagingSenderId: "408308171709"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RoomList 
        firebase={this.props.firebase}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
        <div className="sidebar">
          <h1 className="mainH1">Bloc Chat</h1>
          <RoomList 
          firebase={firebase}
          />
        </div>
        <div className="main">
          <h2>This is the main content</h2>
        </div>
      </div>
    );
  }
}

export default App;

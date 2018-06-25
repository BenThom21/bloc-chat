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
        <RoomList 
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
  constructor(props) {
    super(props)

    this.state= {
      currentRoom: '',
      currentUser: ''
    }

    this.setCurrentRoom = this.setCurrentRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setCurrentRoom(room) {
    this.setState({currentRoom: room})
  }

  setUser(user) {
    console.log(user);
    this.setState({currentUser: user})
  }


  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <h1 className="mainH1">Bloc Chat</h1>
          <User
          firebase={firebase}
          setUser={this.setUser}
          user={this.state.CurrentUser}
          />
          <RoomList 
          firebase={firebase}
          currentRoom={this.state.currentRoom}
          setCurrentRoom={this.setCurrentRoom}
          />
        </div>
        <div className="main">
          <MessageList
          firebase={firebase}
          currentRoom={this.state.currentRoom}
          setUser={this.setUser} 
          user={this.state.currentUser}
          />
        </div>
      </div>
    );
  }
}

export default App;
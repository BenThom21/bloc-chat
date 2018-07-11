import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
    console.log(user);
    console.log(user.displayName);
  });
}

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
}

signOut() {
  this.props.firebase.auth().signOut();
}

//I need a method to track log in status and decide which button to see
//like bloc jams play/pause button
// btnHandler(user) {
//   const loggedIn = <button onClick={() => this.signOut()}>Sign Out</button>;
//   const loggedOut = <button onClick={() => this.signIn()}>Sign In</button>;
//   console.log(user);

//   if (this.props.user === '') {
//     return loggedOut;
//   } 
// }



  render() {
    return(
      //pseudo: 
      //turnary this.props.user=''  if emptry string ? button - onclick signin : (else)
      //button onclick signout }

      <div className="user-btn">
        <span className="logged-in"> Logged in: {this.props.user ? this.props.user.displayName : 'Guest'} </span>
        <span>
          {/* {
            (this.props.user === '')
            ? <button onClick={() => this.signOut()}>Sign Out</button>
            : <button onClick={() => this.signIn()}>Sign In</button>
          } */}


          <button onClick={this.signIn}>
            Login
          </button>
          <button onClick={this.signOut}>
            Logout
          </button>

          
        </span>
      </div>
    );
  }
}


export default User;
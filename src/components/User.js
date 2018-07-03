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
  });
}

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);
}

signOut() {
  this.props.firebase.auth().signOut();
}

//I need a method to track and decide which button to see
//like bloc jams play/pause button - as discussed!
isLoggedIn() {

}



  render() {
    return(
      //turnary this.props.user=''  if emptry string ? button - onclick signin : (else)
      //button onclick signout }
      <div className="user-btn">
        <span> Logged in: {this.props.user ? this.props.user.displayName : 'Guest'} </span>
        <span>
          {
            (this.props.user === '')
            ? <button onClick={() => this.signOut()}>Sign Out</button>
            : <button onClick={() => this.signIn()}>Sign In</button>
          }
        </span>
      </div>
    );
  }
}


export default User;
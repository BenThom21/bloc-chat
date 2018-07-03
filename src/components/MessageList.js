import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state={
      messages: [],
      message: {
        username: this.props.user ? this.props.user.displayName : 'Guest',
        content: '',
        roomID: '',
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      },
    }

    this.messagesRef=this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }



  render() {
    return (
      <div className="message-list-container">
        <h4>{this.props.currentRoom.name}</h4>
        <ul>
          {this.state.messages.filter(message => message.roomID == this.props.currentRoom.key).map( (message, index) => <li key={index}>{message.username}: {message.content} - </li>
          )}
        </ul>
      </div>
    );
  }
}

export default MessageList;
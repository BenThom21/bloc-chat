import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state={
      messages: [],
      message: {
        username: '',
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
      console.log(message);
      console.log(this.props.currentRoom);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
      // console.log(this.state.messages);
    });
  }


  render() {
    return (
      <div className="message-list">
        <h4>{this.props.currentRoom.name}</h4>
        <ul>
          {this.state.messages.filter(message => message.roomID === this.props.currentRoom).map( (message, index) => <li key={index}>{message.username}: {message.content} - </li>
          )}
        </ul>
      </div>
    )
  }
}

export default MessageList;
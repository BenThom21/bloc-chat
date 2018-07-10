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
      newMessage: ''
    }

    this.messagesRef=this.props.firebase.database().ref('messages');
    this.createMessage=this.createMessage.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  createMessage(m) {
    m.preventDefault();
    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : 'Guest',
      content: this.state.newMessage,
      roomID: this.props.currentRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({newMessage: ''});
    console.log('sent!');
  }

  handleChange(m) {
    this.setState({ newMessage: m.target.value });
  }



  render() {
    return (
      <div className="message-list-container">
        <h4>{this.props.currentRoom.name}</h4>
        <ul>
          {this.state.messages.filter(message => message.roomID == this.props.currentRoom.key).map( (message, index) => <li key={index}>{message.username}: {message.content} - </li>
          )}
        </ul>
        <form onSubmit={(m) => this.createMessage(m)}>
          <input type="text" value={this.state.newMessage} onChange={(m) => this.handleChange(m)} />
          <input type='submit' value='Send' />
        </form>
      </div>
    );
  }
}

export default MessageList;
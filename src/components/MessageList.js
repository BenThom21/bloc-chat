import React, { Component } from 'react';
import Moment from 'react-moment';


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
      roomID: this.props.currentRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({newMessage: ''});
    // console.log('sent!');
  }

  handleChange(m) {
    this.setState({ newMessage: m.target.value });
  }




  render() {
    return (
      <div className="message-list-container">
        <h3 className="room-header">{this.props.currentRoom.name}</h3>
        <ul id="message-list">
          {this.state.messages.filter(message => message.roomID == this.props.currentRoom.key).map( (message, index) => <li key={index}>{message.username}: {message.content} - <Moment format="MM/DD/YYYY hh:mm a">{message.sentAt}</Moment></li>
          )}
        </ul>
        <div className="submit-message">
          <form className="submitting" onSubmit={(m) => this.createMessage(m)}>
            <input id="submit-text" type="text" value={this.state.newMessage} onChange={(m) => this.handleChange(m)} />
            <input id="submit-button" type='submit' value='Send' />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
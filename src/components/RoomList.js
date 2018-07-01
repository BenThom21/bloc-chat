import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
    

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({newRoomName: ''})
  }
  handleChange(e) {
    this.setState({newRoomName: e.target.value});
  }



  render() {
    return(
      <div className="room-list-div">

        <form className="newRoom" onSubmit={ (e) => this.createRoom(e) }>
          <input type="text" placeholder="New Room Name" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)}/>
          <button className="roomButton">Add New Room</button>
        </form>

        <section className="room-list">
        {this.state.rooms.map( (room, index) =>
            <div className="room-data" key={index}>
              {room.name} 
            </div>
        )}
        </section>

      </div>  
    );
  }
}

export default RoomList;
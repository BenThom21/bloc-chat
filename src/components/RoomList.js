import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
    

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      console.log(room);
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  // createRoom() {
  //   this.roomsRef.push({
  //     name: newRoomName
  //   });
  // }



  render() {
    return(
      <div className="room-list-div">
        <section className="room-list">
        {this.state.rooms.map( (room, index) =>
            <div className="room-data" key={index}>
              {room.name} 
            </div>
        )}
        </section>
        <form className="newRoom">

        </form>
      </div>  
    );
  }
}

export default RoomList;
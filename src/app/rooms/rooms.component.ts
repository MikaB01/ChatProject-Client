import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Room } from '../room';
import { RoomService } from '../room.service';
import * as swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{
  public displayedColumns: string[] = ['id', 'name', 'delete'];
  rooms: Room[];

  constructor( private socket: Socket, private roomService: RoomService) {}

  ngOnInit() {
    this.getAllRooms();
  }

  joinRoom(room) {
    this.socket.emit('join room', room);
  }

  async createRoomCheck(room) {
    if(!room){
      const {value: newRoom} = await swal.default({
        title: 'Add new room: <br />Please type in a roomname!',
        input: 'text',
        inputPlaceholder: 'Roomname...',
        inputAttributes: {
          maxlength: '20',
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        type: 'info',
        showCancelButton: true,
      });
      if(newRoom){this.createRoom(newRoom);}
    } else this.createRoom(room);
  }

  createRoom(room) {
    let sub = this.roomService.addRoom({name: room})
      .subscribe(async () => {
        await this.getAllRooms();
        sub.unsubscribe() });
  }

  deleteRoom(id) {
    let sub = this.roomService.deleteRoom(id)
      .subscribe(() => { 
        this.getAllRooms();
        sub.unsubscribe() });
  }

  getAllRooms(){
    let sub = this.roomService.getAllRooms()
        .subscribe((response) => {
          this.rooms = response;
          sub.unsubscribe(); });
  }

}

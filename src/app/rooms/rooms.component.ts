import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { Room } from '../room';
import { RoomService } from '../room.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{
  public displayedColumns: string[] = ['id', 'name', 'delete'];
  rooms: Room[];
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  constructor( private socket: Socket, private roomService: RoomService) {}

  ngOnInit() {
    this.getAllRooms();
  }

  joinRoom(room) {
    this.socket.emit('join room', room);
  }

  createRoom(room) {
    if(!room) return alert("insert name");
    let sub = this.roomService.addRoom({name: room})
      .subscribe(async () => {
        await this.getAllRooms();
        console.log(this.rooms);
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

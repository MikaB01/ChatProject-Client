import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Socket } from 'ngx-socket-io';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit, OnDestroy{
  rooms: Room[];
  roomName = '';
  id = +this.route.snapshot.paramMap.get('id');

  messages:string[] = new Array();

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private socket: Socket,
    private roomService: RoomService
  ) {

    this.socket.on('chat message', (msg) => {
      this.messages[this.messages.length] = msg;
    });
  }

  ngOnInit() {
    this.getRoomName();
  }

  ngOnDestroy(){
    this.socket.removeListener('emit');
    this.socket.removeListener('chat message');
  }

  onSubmit(message, id){
    if(message) this.socket.emit('chat message', message, id)
  }

  goBack() {
    this.location.back();
    this.socket.emit('leave room', this.id);
  }

  getRoomName(){
    let sub = this.roomService.getAllRooms()
        .subscribe((response) => {
          this.roomName = response.filter(room => room.id == this.id)[0].name;
          sub.unsubscribe(); });
  }

}

import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
    this.socket.on('emit', (msg) => {
      console.log(msg);
    });
  }

  joinRoom(room) {
    this.socket.emit('join room', room);
  }

}

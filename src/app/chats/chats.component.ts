import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private socket: Socket
  ) { }

  id = +this.route.snapshot.paramMap.get('id');
  public message: string = "";

  ngOnInit() {
  }

  onSubmit(message, id){
    this.socket.emit('chat message', message, id)
  }

  goBack() {
    this.location.back();
    this.socket.emit('leave room', this.id);
  }

}

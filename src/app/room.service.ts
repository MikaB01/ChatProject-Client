import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Room } from './room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAllRooms(){
    return this.http.get<Room[]>('http://localhost:5000/rooms');
  }

  addRoom(name: {name: string}){
    return this.http.post<Room>('http://localhost:5000/rooms', name);
  }

  deleteRoom(id: number){
    return this.http.delete('http://localhost:5000/rooms/' + id);
  }
}

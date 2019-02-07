import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms/rooms.component';
import { ChatsComponent } from './chats/chats.component';

const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:id', component: ChatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserState {
  token = localStorage.getItem('token');
  roles = localStorage.getItem('roles');

  constructor() { }

  isLoggedIn() {
    this.token = localStorage.getItem('token');
    return this.token != null;
  }
  isAuthenticated() {
    this.token = localStorage.getItem('token');
    return this.token != null;
  }

  isAdmin() {
    this.roles = localStorage.getItem('roles');
    return this.roles == 'Admin';
  }

  // isClient() {
  //   this.roles = localStorage.getItem('roles');
  //   for (let index = 0; index < this.roles.length; index++) {
  //     // console.log(this.roles[index])
  //     if (this.roles == "Client" || this.roles[index] == "Client") {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}

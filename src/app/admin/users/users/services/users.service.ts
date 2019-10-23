import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(public http: HttpClient) { }

  getAllUsers(page) {
    return this.http.get(apiUrl + 'admin/users?page=' + page);
  }
  getUserId(id) {
    return this.http.get(apiUrl + 'admin/users/' + id);
  }
  updateUserId(id, data) {
    return this.http.put(apiUrl + 'admin/users/' + id, data);
  }
  postUser(data) {
    return this.http.post(apiUrl + 'admin/users', data);
  }
  deleteUserId(id) {
    return this.http.delete(apiUrl + 'admin/users/' + id);
  }
  searchUsers(name){
    return this.http.get(apiUrl + 'admin/users/search?query=' + name);
  }

}

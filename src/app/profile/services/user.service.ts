import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getProfile() {
    return this.http.get(apiUrl + 'users/' + localStorage.getItem('userId'));
  }
  updateProfile(data) {
    return this.http.put(apiUrl + 'users/' + localStorage.getItem('userId'), data);
  }

}

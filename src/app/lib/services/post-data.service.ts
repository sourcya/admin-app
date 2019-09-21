import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  token: string = localStorage.getItem('token');
  constructor(public http: HttpClient) { }
  postData(path: string, data: any[]) {
    return this.http.post(apiUrl + path, data);
  }

  CreateTask(data: any[]) {
    return this.http.post(apiUrl + 'tasks', data);
  }
  deleteTask(id: number) {
    return this.http.delete(apiUrl + 'tasks/' + id);
  }
  editTask(id: number, data) {
    return this.http.put(apiUrl + 'tasks/' + id, data);
  }
  readNotification(id: number, data) {
    return this.http.post(apiUrl + 'notifications/readSingle/' + id, data);
  }
  readAllNotification(data) {
    return this.http.post(apiUrl + 'notifications/readAll', data);
  }
  CreateContact(data: any[]) {
    return this.http.post(apiUrl + 'contacts', data);
  }
  ediContact(id: number, data) {
    return this.http.put(apiUrl + 'contacts/' + id, data);
  }
  deleteContact(id: number) {
    return this.http.delete(apiUrl + 'contacts/' + id);
  }
  
  
}

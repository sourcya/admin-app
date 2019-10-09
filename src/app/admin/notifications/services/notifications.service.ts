import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public http: HttpClient) { }

  readNotification(id: number, data) {
    return this.http.post(apiUrl + 'admin/notifications/readSingle/' + id, data);
  }
  readAllNotification(data) {
    return this.http.post(apiUrl + 'admin/notifications/readAll', data);
  }
  getNotification(page: number) {
    return this.http.get(apiUrl + 'admin/notifications?page=' + page);
  }
  getUnReadNotification() {
    return this.http.get(apiUrl + 'admin/notifications/unRead');
  }
  
}

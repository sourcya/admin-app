import { Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

// tslint:disable-next-line: deprecation
  constructor(public http: HttpClient) {
    // console.log('get data');
    // console.log(localStorage.getItem('token'));
   }
   getProfile() {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Bearer ' +localStorage.getItem('token'));

    // let options :any= new RequestOptions({ headers: headers });

    return this.http.get(apiUrl + 'users/' + localStorage.getItem('userId'));
  }
  // updateProfile(data) {
  //   return this.http.put(apiUrl + 'users/' + localStorage.getItem('userId'), data);
  // }
  getAvatar() {
    return this.http.get(apiUrl + 'uploads/' + 'avatar/' + localStorage.getItem('userId'));
  }
  getAbout() {
    return this.http.get(apiUrl + 'about');
  }
  getNotification(page:number) {
    return this.http.get(apiUrl + 'notifications?page='+page);
  }
  getUnReadNotification() {
    return this.http.get(apiUrl + 'notifications/unRead');
  }
  getALLTasks(page:number) {
    return this.http.get(apiUrl + 'tasks?page=' + page);
    
  }
  getTask(id: number ) {
    return this.http.get(apiUrl + 'tasks/' + id);
  }
  getContact() {
    return this.http.get(apiUrl + 'contacts');
  }
  getContactId(id: number ) {
    return this.http.get(apiUrl + 'contacts/' + id);
  }
}

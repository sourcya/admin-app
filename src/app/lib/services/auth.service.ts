import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';
 import {HttpClient, HttpHeaders} from '@angular/common/http';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token=localStorage.getItem('token');
// tslint:disable-next-line: deprecation
  constructor(public http:HttpClient) { }
//   postData(credentials, type) {
//     return new Promise((resolve, reject) => {
// // tslint:disable-next-line: deprecation
//       const headers = new Headers();
//       headers.append('content-type', 'application/json');
//       this.http.post(apiUrl + 'auth/' + type, credentials , {headers: headers}).subscribe(res => {
//         resolve(res.json());
//       }, (err) => {
//         reject(err);
//       });
//     });
//   }
  login(
    email: string,
    password: string
  ) {
// tslint:disable-next-line: deprecation
  // let headers = new Headers;
  // headers.append('content-type', 'application/json');
// tslint:disable-next-line: deprecation
//  let options:any = new RequestOptions({ headers: headers});

// tslint:disable-next-line: whitespace
  return this.http.post(apiUrl +'auth/'+'login',
  {
    email: email,
    password: password
  });
}
uploadImage(image: File) {
  const uploadData = new FormData();
  uploadData.append('image', image);

  return this.http.post<{imageUrl: string, imagePath: string}>(apiUrl +'uploads/'+'avatar',
    uploadData
  );
}
 isLoggedIn() {
    this.token = localStorage.getItem('token');
    return this.token != null;
  }
  isAuthenticated() {
    this.token = localStorage.getItem('token');
    return this.token != null;
  }
 
}



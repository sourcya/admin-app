import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('token');

  constructor(public http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(apiUrl + 'auth/' + 'login',
      {
        email: email,
        password: password
      });
  }

  register(data: any[]) {
    return this.http.post(apiUrl +'auth/register' , data);
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{ imageUrl: string, imagePath: string }>(apiUrl + 'uploads/' + 'avatar',
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



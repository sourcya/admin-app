import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class LogOutService {
    token = localStorage.getItem('token');

    constructor(public http: HttpClient) { }

    logoutAllDevices(){
        return this.http.post(apiUrl +'auth/logout/allDevices' , {});
    }

    logout(){
        return this.http.post(apiUrl +'auth/logout' , {});
    }
}
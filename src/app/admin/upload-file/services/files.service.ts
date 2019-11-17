import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(public http: HttpClient) { }

  uploadFile(formData) {
    return this.http.post(apiUrl+ 'admin/uploads/avatar' , formData);
  }

}

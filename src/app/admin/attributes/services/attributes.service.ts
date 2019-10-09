import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(public http: HttpClient) { }

  postAttributes(data: any[]) {
    return this.http.post(apiUrl + 'admin/attributes', data);
  }
  getAllAttributes(page) {
    return this.http.get(apiUrl + 'admin/attributes?page=' + page);
  }
  getAtrributeId(id) {
    return this.http.get(apiUrl + 'admin/attributes/' + id);
  }
  updateAtrributeId(id, data) {
    return this.http.put(apiUrl + 'admin/attributes/' + id, data);
  }
  deleteAtrributeId(id) {
    return this.http.delete(apiUrl + 'admin/attributes/' + id);
  }

  
}

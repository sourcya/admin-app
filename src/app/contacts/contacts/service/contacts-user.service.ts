import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactsUserService {
  constructor(public http: HttpClient) { }

  addContact(data) {
    return this.http.post(apiUrl + 'contacts', data)
  }
  getAllContacts(page) {
    return this.http.get(apiUrl + 'contacts?page=' + page);
  }
  getContactId(id) {
    return this.http.get(apiUrl + 'contacts/' + id)
  }
  editContactId(id, data) {
    return this.http.put(apiUrl + 'contacts/' + id, data)
  }
  deleteContact(id: number) {
    return this.http.delete(apiUrl + 'contacts/' + id);
  }
}

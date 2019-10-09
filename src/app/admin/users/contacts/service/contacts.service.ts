import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(public http: HttpClient) { }

  addContact(data) {
    return this.http.post(apiUrl + 'admin/contacts', data)
  }
  getAllContacts(page) {
    return this.http.get(apiUrl + 'admin/contacts?page=' + page);
  }
  getContactId(id) {
    return this.http.get(apiUrl + 'admin/contacts/' + id)
  }
  editContactId(id, data) {
    return this.http.put(apiUrl + 'admin/contacts/' + id, data)
  }
  deleteContact(id: number) {
    return this.http.delete(apiUrl + 'admin/contacts/' + id);
  }

  getContactsByUser(email, page) {
    return this.http.get(apiUrl + 'admin/contacts/search/' + email + '?page=' + page)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(public http: HttpClient) { }

  getCountries() {
    return this.http.get(apiUrl + 'admin/countries');
  }
  getStates(countryCode) { //Getting States of Country by Country Code
    return this.http.get(apiUrl + 'admin/countries/states/' + countryCode);
  }
  getCities(stateId) {
    return this.http.get(apiUrl + 'admin/states/cities/' + stateId);
  }
  getAllAddresses(page) {
    return this.http.get(apiUrl + 'admin/addresses?page=' + page);
  }
  addAdress(data) {
    return this.http.post(apiUrl + 'admin/addresses', data)
  }
  getAddressId(id) {
    return this.http.get(apiUrl + 'admin/addresses/' + id)
  }
  editAddressId(id, data) {
    return this.http.put(apiUrl + 'admin/addresses/' + id, data)
  }
  deleteAddress(id: number) {
    return this.http.delete(apiUrl + 'admin/addresses/' + id);
  }

  getAddressesByUser(email, page) {
    return this.http.get(apiUrl + 'admin/addresses/search/' + email + '?page=' + page)
  }



}

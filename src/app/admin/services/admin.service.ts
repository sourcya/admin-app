import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  ////////////////////////////Attributes///////////////////////
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

  /////////////////////Users////////////////////
  getAllUsers(page) {
    return this.http.get(apiUrl + 'admin/users?page=' + page);
  }
  getUserId(id) {
    return this.http.get(apiUrl + 'admin/users/' + id);
  }
  updateUserId(id, data) {
    return this.http.put(apiUrl + 'admin/users/' + id, data);
  }
  postUser(data) {
    return this.http.post(apiUrl + 'admin/users', data);
  }
  deleteUserId(id) {
    return this.http.delete(apiUrl + 'admin/users/' + id);
  }

  //////////Agent////////////////////////////
  getAgent() {
    return this.http.get(apiUrl + 'admin/agent');
  }
  postAgentApprove(code) {
    return this.http.post(apiUrl + 'admin/agent/approve/' + code, 'approve');
  }
  postAgentDecline(code) {
    return this.http.post(apiUrl + 'admin/agent/decline/' + code, {});
  }

  //////////////Cities////////////////////////
  getAllCities() {
    return this.http.get(apiUrl + 'admin/cities');
  }
  postCity(data) {
    return this.http.post(apiUrl + 'admin/cities', data);
  }
  updateCity(id, data) {
    return this.http.put(apiUrl + 'admin/cities/' + id, data);
  }
  getCityId(id) {
    return this.http.get(apiUrl + 'admin/cities/' + id);
  }
  deleteCityId(id) {
    return this.http.delete(apiUrl + 'admin/cities/' + id);
  }


  //////////////Addresses//////////////
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

  ////////////Notifications///////////////////////
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

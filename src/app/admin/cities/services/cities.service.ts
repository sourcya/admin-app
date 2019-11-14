import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(public http: HttpClient) { }

  getAllCities(page) {
    return this.http.get(apiUrl + 'admin/cities?page=' + page);
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

  getCountries() {
    return this.http.get(apiUrl + 'admin/countries');
  }
  getStates(countryCode) { //Getting States of Country by Country Code
    return this.http.get(apiUrl + 'admin/countries/states/' + countryCode);
  }
}

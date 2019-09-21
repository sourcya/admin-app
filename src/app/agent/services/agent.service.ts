import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(public http: HttpClient) { }

  PostRegisterAgent(data: any[]){
    return this.http.post(apiUrl + 'agent/register', data);
  }

  getCountries() {
    return this.http.get(apiUrl + 'countries');
  }
  getStates(countryCode) { //Getting States of Country by Country Code
    return this.http.get(apiUrl + 'countries/states/' + countryCode);
  }
  getCities(stateId) {
    return this.http.get(apiUrl + 'states/cities/' + stateId);
  }


}

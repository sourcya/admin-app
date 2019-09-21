import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
 import {HttpClient, HttpHeaders} from '@angular/common/http';
 const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(public http:HttpClient) { }
  getCountries(){
  return   this.http.get(apiUrl+'countries');
  }
  getStates(){
    return   this.http.get(apiUrl+'states');
    }

  getCities(){
      return   this.http.get(apiUrl+'cities');
    }
  getAllAddresses(){
    return   this.http.get(apiUrl+'addresses'); 
  }  
  addAdress(data){
    return this.http.post(apiUrl+'addresses',data)
  }
  getAddressId(id){
    return this.http.get(apiUrl+'addresses/'+id)
  }
  editAddressId(id,data){
    return this.http.put(apiUrl+'addresses/'+id,data) 
  }
  deleteAddress(id: number) {
    return this.http.delete(apiUrl + 'addresses/' + id);
  }
  
}

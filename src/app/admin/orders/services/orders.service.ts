import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public http: HttpClient) { }

  getAllServices(page) {
    return this.http.get(apiUrl + 'admin/logistic/service?page=' + page);
  }

  getAllOrders(page) {
    return this.http.get(apiUrl + 'logistic/order?page=' + page);
  }


}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(public http: HttpClient) { }

  getAgent(page) {
    return this.http.get(apiUrl + 'admin/agent?page=' + page);
  }
  postAgentApprove(code) {
    return this.http.post(apiUrl + 'admin/agent/approve/' + code, 'approve');
  }
  postAgentDecline(code) {
    return this.http.post(apiUrl + 'admin/agent/decline/' + code, {});
  }
  
}

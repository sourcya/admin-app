import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http: HttpClient) { }

  getAllRoles(page) {
    return this.http.get(apiUrl + 'admin/roles?page=' + page);
  }
  getAllPermissions() {
    return this.http.get(apiUrl + 'admin/permissions' );
  }
  addRole(data) {
    return this.http.post(apiUrl + 'admin/roles' ,data);
  }
  editRoleId(id, data) {
    return this.http.put(apiUrl + 'admin/roles/' + id, data)
  }
  deleteRole(id: number) {
    return this.http.delete(apiUrl + 'admin/roles/' + id);
  }
  getRoleId(id:number) {
    return this.http.get(apiUrl + 'admin/roles/' + id)
  }
}
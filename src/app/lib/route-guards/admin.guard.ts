import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private toast: ToastService,) { }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        for (let index = 0; index < JSON.parse(localStorage.getItem('roles')).length; index++) {
            if (JSON.parse(localStorage.getItem('roles'))[index] == "Admin") {
              return true;
            }
            else {
              this.toast.show("User Does not have a right Role");
              this.router.navigate(['/login']);
              return false;
            }
          }
    }
}

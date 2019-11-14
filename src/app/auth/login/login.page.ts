import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginForm', { static: false }) loginForm: NgForm;

  constructor(private auth: AuthService,
    private router: Router,
    private toast: ToastService,) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  }

  loginUser() {
  
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {

        localStorage.setItem('token', res['token']);
        localStorage.setItem('username', (res['data'].first_name + " " + res['data'].last_name));
        localStorage.setItem('userId', res['data'].id);
        localStorage.setItem('roles', JSON.stringify(res['data'].roles));

        this.toast.show(res['message']);
        console.log(JSON.parse(localStorage.getItem('roles')));

        for (let index = 0; index < JSON.parse(localStorage.getItem('roles')).length; index++) {
          if (JSON.parse(localStorage.getItem('roles'))[index] == "Admin") {
            console.log("Admin");
            this.router.navigate(['/admin']);
          }
          else {
            this.toast.show("User Does not have a right Role");
          }
        }
    });

  }

  

}

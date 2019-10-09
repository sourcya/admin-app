import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from 'src/app/lib/services/toast.service';
import { UserState } from 'src/app/lib/helpers/user-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message: any;
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  responseData: any;
  loading: any;

  constructor(private auth: AuthService,
    private router: Router,
    private userState: UserState,
    private toast: ToastService,
    private translate: TranslateService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  openPrivacy() {
    this.router.navigateByUrl('/app/about');
  }

  loginUser() {
    this.loading = this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (res) => {
          this.responseData = res;
          localStorage.setItem('token', this.responseData.token);
          localStorage.setItem('username', (this.responseData.data.first_name + " " + this.responseData.data.last_name));
          localStorage.setItem('userId', this.responseData.data.id);
          localStorage.setItem('roles', JSON.stringify(this.responseData.data.roles));
          loading.dismiss();

          this.toast.show(res['message']);
          console.log(JSON.parse(localStorage.getItem('roles')));
          
          for (let index = 0; index < JSON.parse(localStorage.getItem('roles')).length; index++) {
            if(JSON.parse(localStorage.getItem('roles'))[index] == "Admin"){
              console.log("Admin");
              this.router.navigate(['/admin']);
            }
            else{
              this.toast.show("User Does not have a right Role");
            }
          }

        },
        (err) => {
          loading.dismiss();
          this.toast.show(err.message);
        });
    });
  }

}

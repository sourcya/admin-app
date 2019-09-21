import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../lib/services/auth.service';
import { ToastService } from '../../lib/services/toast.service';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message: any;
  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  responseData: any;
  loading: any;

  constructor(private auth: AuthService,
    private route: Router,
    private toast: ToastService,
    private translate: TranslateService,
    private loadingController: LoadingController) { }

  ngOnInit() { }

  login() {
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
          localStorage.setItem('roles', this.responseData.data.roles);

          loading.dismiss();
          
          this.toast.show(this.translate.instant('login-valid'));

          this.route.navigate(['/home']);

        },
        (err) => {
          loading.dismiss();

          if (err.status === 422) {
          
            this.toast.show(this.translate.instant('login-invalid'));
          }
          if (err.status === 500) {
            this.message = err;
            this.toast.show(this.translate.instant('login-error'));
          }
        });
    });
  }

}

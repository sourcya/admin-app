import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  message: any;
  loading: any;

  @ViewChild('registerForm' , {static: false}) registerForm: NgForm;
  constructor(
    private route: Router,
    private auth: AuthService ,
    private toast: ToastService,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }


  registerUser() {
    this.loading = this.loadingController.create({
      message:  this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.auth.register( this.registerForm.value).subscribe(res => {
          this.message = res;
          // console.log(res.message)
          loading.dismiss();

          this.toast.show(this.translate.instant('register-valid'));
          this.presentToast('hello')
          this.route.navigate(['/login']);
        },
          // tslint:disable-next-line: no-unused-expression
          (err) => {
            loading.dismiss();

            if (err.status === 422) {
              // this.message = err.error;
              // let responseErrors = this.message.errors
              // let responseErrorsArray = Object.entries(responseErrors)
              // for (let i = 0; i <= responseErrorsArray.length - 1; i++) {
              //   // console.log(responseErrorsArray[i][0]+ ":" + responseErrorsArray[i][1]);
              //   this.message = responseErrorsArray[i][1];
              //   // console.log(this.message);
              // }
              this.toast.show(this.translate.instant('register-invalid'));
            } else if (err.status === 500) {
              this.message = err.error;
              this.toast.show(JSON.stringify(this.message));
            } else {
              this.toast.show('Check Your Connection');
            }
          });
    });

  }


  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast",
    });
    // toast.present();
  }
}

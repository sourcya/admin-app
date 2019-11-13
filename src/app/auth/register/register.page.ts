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

  @ViewChild('registerForm' , {static: false}) registerForm: NgForm;
  constructor(
    private route: Router,
    private auth: AuthService ,
    private toast: ToastService,
    ) { }

  ngOnInit() { }


  registerUser() {
      this.auth.register( this.registerForm.value).subscribe(res => {
          // console.log(res.message)
          this.toast.show(res['message']);
          this.route.navigate(['/login']);
    });

  }

}

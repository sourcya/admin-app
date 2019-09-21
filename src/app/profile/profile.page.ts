import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('ProfileInfoUpdate' , {static: false}) ProfileInfoUpdate: NgForm;

  info: any;
  loading: any;

  constructor(
    private loadingController: LoadingController,
    private userService: UserService, private translate: TranslateService,
    public toast: ToastService, ) { }

  ngOnInit() {
  }//end ngOnInit

  //it Will get the data when i enter the page everyTime ^^
  ionViewWillEnter() {
    this.info = null;

    this.loading = this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.userService.getProfile().subscribe((res) => {
        this.info = res['data'];

        loading.dismiss();
      }, (err) => {
        loading.dismiss();
      });
    });
  }

  updateProfile(){
    this.userService.updateProfile(this.ProfileInfoUpdate.value).subscribe((res)=>{
      this.toast.show(res['message'])
      window.location.reload()
    },(err)=>{
      console.log(err);
      this.toast.show(err.error.message)
    })
    

  }


  ionRefresh(event) {
    this.info = null;

    this.userService.getProfile().subscribe((res) => {
      this.info = res['data'];
      event.target.complete();
    }, (err) => {
      event.target.complete();

    });
  }

}

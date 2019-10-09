import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController, NavParams, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  dataShow = {
    user: this.translate.instant('user'),
    firstName: this.translate.instant('first-name'),
    lastName: this.translate.instant('last-name'),
    email: this.translate.instant('email'),
    selectRoles: this.translate.instant('select-roles'),
    ok: this.translate.instant('ok'),
    cancel: this.translate.instant('cancel'),
    update: this.translate.instant('user-update')
  }
  dataRoles:any;

  userId: any;
  data: any;
  Roles = [
    "Agent",
    "Client",
    "Admin",
  ];

  // choose=[];

  constructor(
    private userService: UsersService,
    public navParams: NavParams,
    public translate: TranslateService,
    private loadingController: LoadingController,
    private toast: ToastService,
    public modalController: ModalController
    ) { }

  ngOnInit() {
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter() {
    this.data = null;
    this.loadingController.create({
      message: this.translate.instant("loading")
    }).then(loading => {
      loading.present();

      this.userId = this.navParams.get('id');

      this.userService.getUserId(this.userId).subscribe(res => {
        this.data = res["data"];
        console.log(this.data);
        // for (let i = 0; i < this.data.roles.length; i++) {
        //   console.log(this.data.roles[i], i);
        // }
        this.dataRoles = this.data.roles;
        loading.dismiss();
      },
        err => {
          loading.dismiss();
          if (err.status === 404) {
            // this.data.length = 0
          }
        }
      );
    });
  }

  changeRoles(){
    this.dataRoles = null;
  }

  edit(userForm) {
    this.loadingController.create({
      message: this.translate.instant("loading")
    }).then(loading => {
      loading.present();
      this.userService.updateUserId(this.userId, userForm.value).subscribe(res => {
        loading.dismiss();

        this.cancel();
        this.toast.show(res['message']);
      }, err => {
        loading.dismiss();
        this.toast.show(err.error.message);
      })
    });
  }
  

  ionRefresh(event) {
    this.data = null;

    this.userService.getUserId(this.userId).subscribe(res => {
      this.data = res["data"];
      console.log(this.data);
      for (let i = 0; i < this.data.roles.length; i++) {
        console.log(this.data.roles[i], i);

      }
      event.target.complete();
    },
      err => {
        event.target.complete(); if (err.status === 404) {
        }
      }
    );
  }




}

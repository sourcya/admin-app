import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { UsersFilterPage } from '../users-filter/users-filter.page';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  usersData={
    users :this.translate.instant('users')
  }

  page = 1;
  userError: any;
  dataListPagination = [];

  response: any;

  constructor(
    private loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController,
    public router:Router,
    public translate:TranslateService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.userError = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.adminService.getAllUsers(this.page).subscribe(res => {
        // console.log(res);
        this.response = res;

        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }

        loading.dismiss();

      }, (err => {
        console.log(err);

        loading.dismiss();
        if (err.status === 404) {
          // this.data.length = 0
          this.userError = this.translate.instant('user-Error');
        }
      }));

    });
  }


  getPosts(page) {
    this.adminService.getAllAttributes(page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

    }, (err => {
      console.log(err);

      if (err.status === 404) {
        // this.data.length = 0
        this.userError = this.translate.instant('user-Error');
      }
    }));
  }


  // //pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getPosts(this.page);
        }
        event.target.complete();
        // console.log(this.dataListPagination);
        if (this.dataListPagination.length == this.response.meta.total) {
          event.target.disabled = true;
        }
      }
      else {
        event.target.disabled = true;
      }

    }, 500);
  }



  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.dataListPagination = [];
    this.page = 1;
    this.userError = null;
    this.adminService.getAllUsers(this.page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

      event.target.complete();

    }, (err => {
      event.target.complete();

      if (err.status === 404) {
        this.userError = this.translate.instant('user-Error');
      }
    }));
  }




  useFilter() {
    this.modalController
      .create({
        component: UsersFilterPage
      })
      .then(modal => {
        modal.present();
      });
  }

  async deleteUser(){
    const alert = await this.alertController.create({
      
      header: this.translate.instant('confirm'),
      message:  this.translate.instant('sure-to-delete'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: this.translate.instant('ok'),
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


  // editUser(){
  //   this.router.navigateByUrl('/admin/users/edit-user');
  // }
}

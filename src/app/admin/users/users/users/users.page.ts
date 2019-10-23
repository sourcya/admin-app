import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../services/users.service';
import { AddUserPage } from '../add-user/add-user.page';
import { EditUserPage } from '../edit-user/edit-user.page';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  usersData = {
    users: this.translate.instant('users')
  }

  page = 1;
  userError: any;
  dataListPagination = [];

  response: any;

  search = false;
  dataSearch = [];
  responseSearch: any;
  pageSearch = 1;

  constructor(
    private loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public translate: TranslateService,
    private toast: ToastService,
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.userError = null;
    this.dataSearch = [];

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.userService.getAllUsers(this.page).subscribe(res => {
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

  addUsers() {
    //Create Modal Page
    this.modalController.create({
      component: AddUserPage
    }).then((modal) => {
      modal.present();
    });
  }

  getPosts(page) {
    this.userService.getAllUsers(page).subscribe(res => {
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
    setTimeout(() => {
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          this.getPosts(this.page);
        }
        event.target.complete();
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
    this.dataListPagination = [];
    this.page = 1;
    this.userError = null;
    this.dataSearch = [];

    this.userService.getAllUsers(this.page).subscribe(res => {
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

  condSearch() {
    if (this.search) {
      this.search = false;
    }
    else {
      this.search = true;
    }
  }

  searchUsers(ev) {
    this.response = null;
    this.dataListPagination = [];
    this.dataSearch = [];
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.userService.searchUsers(ev.target.value).subscribe(res => {
        this.responseSearch = res;
        for (let index = 0; index < this.responseSearch.data.length; index++) {
          this.dataSearch.push(this.responseSearch.data[index]);
        }
        loading.dismiss();
        // if (this.dataSearch.length <= 0) {
        //   this.toast.show(this.translate.instant('project-search-no'))
        // }
      }, err => {
        loading.dismiss();
        this.toast.show(err.error.message)
      })
    });
  }


}




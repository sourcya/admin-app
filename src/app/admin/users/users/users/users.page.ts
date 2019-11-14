import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../services/users.service';
import { AddUserPage } from '../add-user/add-user.page';
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

    this.getPosts(this.page);
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

      for (let index = 0; index < res['data'].length; index++) {
        this.dataListPagination.push(res['data'][index]);
      }

    });
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

    this.getPosts(this.page);
    event.target.complete();
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

    this.userService.searchUsers(ev.target.value).subscribe(res => {
      this.responseSearch = res; 
      for (let index = 0; index < res['data'].length; index++) {
        this.dataSearch.push(res['data'][index]);
      }

      // if (this.dataSearch.length <= 0) {
      //   this.toast.show(this.translate.instant('project-search-no'))
      // }

    });
  }


}




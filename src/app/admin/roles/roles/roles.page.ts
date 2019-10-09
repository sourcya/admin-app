import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoleService } from '../service/role.service';
import { AddRolePage } from '../add-role/add-role.page';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  page = 1;
  roleError: any;
  dataListPagination = [];
  response: any;
  role = {
    roles: this.translate.instant('roles')
  }

  constructor(
    private loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public translate: TranslateService,
    public roleService: RoleService
  ) { }

  ngOnInit() {
    console.log(this.dataListPagination)
    this.roleService.getAllRoles(1).subscribe(res => {
      console.log(res);
    })
  }


  addRoles(){
    //Create Modal Page
    this.modalController.create({
      component: AddRolePage
    }).then((modal) => {
      modal.present();
    });
  }

  ionViewWillEnter() {
    this.roleError = null
    this.dataListPagination = [];
    this.page = 1;


    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      // this.getRoles(this.page)
      this.roleService.getAllRoles(this.page).subscribe(res => {
        console.log(res);
        this.response = res;
        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }
        console.log(this.dataListPagination)
        loading.dismiss();

      }, (err => {
        console.log(err);

        loading.dismiss();
        if (err.status === 404) {
          // this.data.length = 0
          this.roleError = this.translate.instant('roles-Error');
        }
      }));

    });
  }

  getRoles(page) {
    this.roleService.getAllRoles(this.page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }
      console.log(this.dataListPagination)
    }, (err => {
      if (err.status === 404) {
        // this.data.length = 0
        this.roleError = this.translate.instant('roles-Error');
      }
    }));
  }


  // //pagination
  loadDataPagination(event) {
    console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getRoles(this.page);
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
    this.roleError = null;
    this.roleService.getAllRoles(this.page).subscribe(res => {
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

      event.target.complete();

    }, (err => {
      event.target.complete();

      if (err.status === 404) {
        this.roleError = this.translate.instant('roles-Error');
      }
    }));
  }
  
}

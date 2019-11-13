import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public translate: TranslateService,
    public roleService: RoleService
  ) { }

  ngOnInit() {
  }


  addRoles() {
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

    this.getRoles(this.page);
  }

  getRoles(page) {
    this.roleService.getAllRoles(page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.dataListPagination.push(res['data'][index]);
      }
    });
  }


  ////pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
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

    this.getRoles(this.page);
    event.target.complete();
  }

}

import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RolesFilterPage } from '../roles-filter/roles-filter.page';
import { RoleService } from '../service/role.service';

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
    roles : this.translate.instant('roles')
  }
  roles = [
    { name: 'Role1', title: 'title', code: '1234', Role: 'role'  },
    { name: 'Role2', title: 'title', code: '1235', role: 'role' },
    { name: 'Role3', title: 'title', code: '1236', role: 'role' },
    { name: 'Role4', title: 'title', code: '1237', role: 'role' },
    { name: 'Role5', title: 'title', code: '1238', role: 'role'},
    { name: 'Role6', title: 'title', code: '1239', role: 'role' },
    { name: 'Role7', title: 'title', code: '1233', role: 'role' }
  ];

  constructor(
    private loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController,
    public router: Router,
    public translate: TranslateService,
    public roleService:RoleService
  ) {}

  ngOnInit() {
    console.log(this.dataListPagination)
this.roleService.getAllRoles(1).subscribe(res =>{
  console.log(res);
})
  }
  useFilter() {
    this.modalController
      .create({
        component: RolesFilterPage
      })
      .then(modal => {
        modal.present();
      });
  }
  async deleteRole() {
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
  editRole() {
    this.router.navigateByUrl('/admin/roles/345/edit-role');
  }



ionViewWillEnter() {
  this.roleError=null
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


// openDetail(id: number) {
//   this.router.navigateByUrl('address/' + id);
// }



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
// openContact(id){
//   this.router.navigate(['/admin/contacts/'+id]);
// }
}

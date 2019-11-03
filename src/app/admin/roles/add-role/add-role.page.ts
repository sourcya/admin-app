import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoleService } from '../service/role.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.page.html',
  styleUrls: ['./add-role.page.scss']
})
export class AddRolePage implements OnInit {
  role = {
    addRole: this.translate.instant('add-role'),
    selectPermission: this.translate.instant('select-permissions'),
    ok: this.translate.instant('ok'),
    selectRoles: this.translate.instant('select-roles'),
    title: this.translate.instant('title'),
    cancel: this.translate.instant('cancel'),
    create: this.translate.instant('create')
  };
  permissions: any = [];
  dataMember = [];
  constructor(
    public translate: TranslateService,
    public roleService: RoleService,
    private loadingController: LoadingController,
    private toast: ToastService,
    private router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() { }


  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter() {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.roleService.getAllPermissions().subscribe(res => {
        console.log(res);
        this.permissions = res['data'];
        loading.dismiss();

      }, err => {
        loading.dismiss();
        this.toast.show(err.error.message);
      });
    });
  }

  addRole(roleForm) {
    console.log(roleForm.value)
    this.loadingController.create({
      message: this.translate.instant("loading")
    })
      .then(loading => {
        loading.present();

        this.roleService.addRole(roleForm.value).subscribe(res => {
          loading.dismiss();

          this.cancel();
          this.toast.show(res['message']);
          this.router.navigate(['/admin/roles']);
        }, err => {
          console.log(err)
          loading.dismiss();
          this.toast.show(err.error['errors'].name);
        })
      });
  }
}

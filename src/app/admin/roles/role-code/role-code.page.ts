import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-code',
  templateUrl: './role-code.page.html',
  styleUrls: ['./role-code.page.scss'],
})
export class RoleCodePage implements OnInit {
  @ViewChild('editRole', { static: false }) editRole: NgForm;
  phone: any;
  roleId: any;
  data: any;
  message: any;
  permissions: any = [];
  permission: any = [];
  dataShow = {
    role: this.translate.instant('role'),
    contact: this.translate.instant('contact'),
    phone: this.translate.instant('phone'),
    delete: this.translate.instant('delete'),
    update: this.translate.instant('update'),
    selectPermission: this.translate.instant('select-permissions'),
    ok: this.translate.instant('ok'),
    selectRoles: this.translate.instant('select-roles'),
    title: this.translate.instant('title'),
    cancel: this.translate.instant('cancel'),
    permissions: this.translate.instant('permissions'),
  };


  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private toast: ToastService,
    private router: Router,
    private loadingController: LoadingController,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("id"));
      if (params.get('code')) {
        this.roleId = params.get('code');
        console.log(this.roleId);
      }
    });

  }


  ionViewWillEnter() {
    this.roleService.getRoleId(this.roleId).subscribe(res => {
      console.log(res)
    })
    this.data = null;
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then(loading => {
        loading.present();
        this.roleService.getAllPermissions().subscribe(res => {
            loading.dismiss();
            console.log(res);
            this.permission = res['data'];
            this.roleService.getRoleId(this.roleId).subscribe(res => {
                loading.dismiss();
                this.data = res['data'];
                // console.log(this.data);
                this.permissions = this.data.permissions;
                this.editRole.setValue({
                  name: this.data.name,
                })
              },
              err => {
                loading.dismiss();
                this.toast.show(err.error.message);
              }
            );
          })

      });
  }

  edit(contact) {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.roleService.editRoleId(this.roleId, this.editRole.value).subscribe(res => {
        loading.dismiss();

        this.toast.show(res['message']);
        this.router.navigate(['/admin/roles']);
      }, err => {
        loading.dismiss();

        this.toast.show(err.error['errors'].name);
      });
    });

  }

  deleteRole() {
    this.alertCtrl.create({
      message: this.translate.instant('role-message'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: this.translate.instant('delete'),
          handler: () => {

            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();

              this.roleService.deleteRole(this.roleId).subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);
                this.router.navigate(['/admin/roles']);
              },
                (err) => {
                  console.log(err)
                  loading.dismiss();
                    this.toast.show(err.error['errors'].name);
                }
              );
            });
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';

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
  // dataMember:any;

  userId: any;
  data: any;
  Roles = [
    "Agent",
    "Client",
    "Admin",
  ];

  // choose=[];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private loadingController: LoadingController,
    private toast: ToastService,
    private alertCtrl: AlertController,
    private router: Router, ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("id"));
      if (params.get("id")) {
        this.userId = params.get("id");
        // console.log(this.attributeId);
      }
    });
  }

  ionViewWillEnter() {

    this.data = null;

    this.loadingController.create({
      message: this.translate.instant("loading")
    })
      .then(loading => {
        loading.present();
        this.adminService.getUserId(this.userId).subscribe(res => {
          this.data = res["data"];
          console.log(this.data);
          for (let i = 0; i < this.data.roles.length; i++) {
            console.log(this.data.roles[i], i);
          }
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

  edit(userForm) {
    this.loadingController.create({
      message: this.translate.instant("loading")
    })
      .then(loading => {
        loading.present();

        this.adminService.updateUserId(this.userId, userForm.value).subscribe(res => {
          loading.dismiss();

          this.toast.show(res['message']);
        })
      });
  }


  deleteUser() {
    this.alertCtrl.create({
      message: this.translate.instant('user-message'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant('delete'),
          handler: () => {

            // console.log('Confirm Okay');

            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();

              this.adminService.deleteUserId(this.userId).subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);
                this.router.navigate(['/admin/users'])
              },
                (err) => {
                  loading.dismiss();
                  this.toast.show(err.error.message)
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

  ionRefresh(event) {
    // console.log('Pull Event Triggered!');

    // event.target.complete();
    this.data = null;

    this.adminService.getUserId(this.userId).subscribe(res => {
      this.data = res["data"];
      console.log(this.data);
      for (let i = 0; i < this.data.roles.length; i++) {
        console.log(this.data.roles[i], i);

      }
      event.target.complete();
    },
      err => {
        event.target.complete(); if (err.status === 404) {
          // this.data.length = 0
        }
      }
    );


  }




}

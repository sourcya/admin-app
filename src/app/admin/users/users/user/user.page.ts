import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AddressesPage } from 'src/app/admin/users/addresses/addresses.page';
import { EditUserPage } from '../edit-user/edit-user.page';
import { ContactsPage } from '../../contacts/contacts.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  dataRes: any;
  userId: any;

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private toast: ToastService,
    private alertCtrl: AlertController,
    private router: Router,
    public modalController: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get("id")) {
        this.userId = params.get("id");
      }
    });
  }

  ionViewWillEnter() {
    this.dataRes = null;

      this.userService.getUserId(this.userId).subscribe(res => {
        this.dataRes = res["data"];
    });
  }

  addresses() {
    //Create Modal Page
    this.modalController.create({
      component: AddressesPage,
      componentProps: {
        'userEmail': this.dataRes.email,
      }
    }).then((modal) => {
      modal.present();
    });
  }

  contacts() {
    //Create Modal Page
    this.modalController.create({
      component: ContactsPage,
      componentProps: {
        'userEmail': this.dataRes.email,
      }
    }).then((modal) => {
      modal.present();
    });
  }

  edit() {
    //Create Modal Page
    this.modalController.create({
      component: EditUserPage,
      componentProps: {
        'id': this.dataRes.id,
      }
    }).then((modal) => {
      modal.present();
    });
  }

  delete() {
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

              this.userService.deleteUserId(this.userId).subscribe(res => {
                this.toast.show(res['message']);
                this.router.navigate(['/admin/users'])
            });

          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  ionRefresh(event) {
    this.dataRes = null;
    
    this.userService.getUserId(this.userId).subscribe(res => {
      this.dataRes = res["data"];
      event.target.complete();
    });
  }

}

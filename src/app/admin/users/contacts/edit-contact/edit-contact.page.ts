import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { ContactsService } from '../service/contacts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  @ViewChild('editContact', { static: false }) editContact: NgForm;
  phone: any;
  contactId: any;
  data: any;
  message: any;
  dataShow = {
    contact: this.translate.instant('contact'),
    phone: this.translate.instant('phone'),
    delete: this.translate.instant('delete'),
    update: this.translate.instant('update'),
  };


  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private toast: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("id"));
      if (params.get('id')) {
        this.contactId = params.get('id');
        // console.log(this.contactId);
      }
    });
  }


  ionViewWillEnter() {
    this.data = null;

    this.contactService.getContactId(this.contactId).subscribe(res => {
      this.data = res['data'];
      // console.log(this.data);
      this.editContact.setValue({
        phone_num: this.data.phone_num.phone_num
      })

    });
  }

  edit(contact) {
    this.contactService.editContactId(this.contactId, this.editContact.value).subscribe(res => {
      this.toast.show(res['message']);
      this.router.navigate(['/admin/user/' + this.data.user.id]);
    });

  }

  deleteContact() {
    this.alertCtrl.create({
      message: this.translate.instant('contact-message'),
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

            this.contactService.deleteContact(this.contactId).subscribe(res => {
              this.toast.show(res['message']);
              this.router.navigate(['/admin/user/' + this.data.user.id]);
            });

          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }



}

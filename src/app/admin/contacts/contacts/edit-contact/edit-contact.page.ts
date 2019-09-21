import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AddressesService } from 'src/app/addresses/service/address.service';
import { ContactsService } from '../service/contacts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  @ViewChild('editContact',{ static: false }) editContact :NgForm;
 phone:any;
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
    private contactService:ContactsService,
    private addressesService: AddressesService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private toast: ToastService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("id"));
      if (params.get('id')) {
        this.contactId = params.get('id');
        console.log(this.contactId);
      }
    });
  }


  ionViewWillEnter() {
    // this.contactService.getContactId(this.contactId).subscribe(
    //   res => {
    //     this.data = res['data'];
    //     console.log(this.data);
    //     console.log(this.data.phone_num.phone_num , "phone");
    //       this.editContact.setValue({
    //       phone_num:this.data.phone_num.phone_num
    //    })

    //   });
      
  
     
    this.data = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    })
      .then(loading => {
        loading.present();
        this.contactService.getContactId(this.contactId).subscribe(
          res => {
            loading.dismiss();
            this.data = res['data'];
                console.log(this.data);
                  this.editContact.setValue({
                  phone_num:this.data.phone_num.phone_num
                })
          },
          err => {
            loading.dismiss();
            if (err.status === 404) {
    
            }
          }
        );
      });
  }

  edit(contact) {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.contactService.editContactId(this.contactId, this.editContact.value).subscribe(res => {
        loading.dismiss();

        this.toast.show(this.translate.instant('contact-update'));
        this.router.navigate(['/admin/contacts']);
      }, err => {
        loading.dismiss();

        this.toast.show(this.translate.instant('internal-server'));
      });
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

          

            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();

              this.contactService.deleteContact(this.contactId).subscribe(res => {
                const resp = res;
                loading.dismiss();
                this.toast.show(this.translate.instant('success-deleted'));
                this.router.navigate(['/admin/contacts']);
              },
                (err) => {
                  loading.dismiss();
                  if (err.status === 500) {
                    this.message = err;
                    this.toast.show(this.translate.instant('message-server'));
                  }
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

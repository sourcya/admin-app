import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsUserService } from '../service/contacts-user.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  @ViewChild('createContact', { static: false }) createContact: NgForm;
  model: any = {};
  dataShow = {
    addContact:this.translate.instant('add-contact'),
    email: this.translate.instant('email'),
    website: this.translate.instant('website'),
    company: this.translate.instant('company'),
    phoneNum: this.translate.instant('first-phone'),
    alternativeNum: this.translate.instant('second-phone'),
    userEmail: this.translate.instant('email-user'),
    create:this.translate.instant('create')
  
  }
  constructor(private loadingController: LoadingController,
    private router: Router, private translate: TranslateService,
    private contactService:ContactsUserService,
    private toast: ToastService,
    public modalController: ModalController) {
      
     }
     ngOnInit() {
    }

    ionViewWillEnter() {
    }
    addContact() {
      this.loadingController.create({
        message: this.translate.instant('loading')
      }).then((loading) => {
        loading.present();
    
        this.contactService.addContact(this.createContact.value).subscribe((res) => {
          loading.dismiss();
          this.toast.show(this.translate.instant('success-created'))
          this.router.navigate(['/contacts']);
    
        }, (err) => {
          console.log(err);
          loading.dismiss();
    
          if (err.status === 401) {
            this.toast.show(this.translate.instant('error-401'));
          }
    
          if (err.status === 404) {
            this.toast.show(this.translate.instant('error-404'));
          }
          if (err.status === 422) {
    
            this.toast.show(this.translate.instant('error-422'));
    
          }
          if (err.status === 500) {
            this.toast.show(this.translate.instant('error-500'));
          }
        });
      });
    }
    
    }













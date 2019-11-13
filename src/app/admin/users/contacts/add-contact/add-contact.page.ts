import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../service/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  @ViewChild('createContact', { static: false }) createContact: NgForm;
  model: any = {};
  dataShow = {
    addContact: this.translate.instant('add-contact'),
    email: this.translate.instant('email'),
    website: this.translate.instant('website'),
    company: this.translate.instant('company'),
    phoneNum: this.translate.instant('first-phone'),
    alternativeNum: this.translate.instant('second-phone'),
    userEmail: this.translate.instant('email-user'),
    create: this.translate.instant('create')
  }

  constructor(
    private router: Router, private translate: TranslateService,
    private contactService: ContactsService,
    private toast: ToastService,
    public modalController: ModalController) {

  }
  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addContact() {
      this.contactService.addContact(this.createContact.value).subscribe((res) => {
        this.cancel();
        this.toast.show(res['message'])
        this.router.navigate(['/admin/user/' + res['data'].user.id]);
    });
  }

}












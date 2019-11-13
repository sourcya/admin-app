import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ContactsService } from './service/contacts.service';
import { AddContactPage } from './add-contact/add-contact.page';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  page = 1;
  contactsError: any;
  dataListPagination = [];
  response: any;

  dataShow = {
    name: this.translate.instant('name'),
    phone: this.translate.instant('phone'),
    contacts: this.translate.instant('contacts'),
  };

  userEmail: any;

  constructor(
    public router: Router,
    private translate: TranslateService,
    public modalController: ModalController,
    public navParams: NavParams,
    public contactService: ContactsService) { }


  ngOnInit() {
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.contactsError = null;

    this.userEmail = this.navParams.get('userEmail');

    this.getPosts(this.page);    
    
  }

  getPosts(page) {
    this.contactService.getContactsByUser(this.userEmail, page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.dataListPagination.push(res['data'][index]);
      }
    });
  }


  // //pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getPosts(this.page);
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
    this.contactsError = null;

    this.getPosts(this.page);

    event.target.complete();
  }

  openContact(id) {
    this.cancel();
    this.router.navigate(['/admin/contacts/' + id]);
  }

  addContact() {
    //Create Modal Page
    this.modalController.create({
      component: AddContactPage
    }).then((modal) => {
      modal.present();
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { ContactsUserService } from './service/contacts-user.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
    contacts:this.translate.instant('contacts'),
  
  };
  
  constructor(
    public router: Router,
    private translate: TranslateService,
    private loadingController: LoadingController,
    public modalController: ModalController,
    public contactService:ContactsUserService) { }
  
  
  ngOnInit() {
    console.log(this.dataListPagination)
  }
  
  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.contactsError = null;
  
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      // this.getPosts(this.page)
      this.contactService.getAllContacts(this.page).subscribe(res => {
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
          this.contactsError = this.translate.instant('contacts-Error');
        }
      }));
  
    });
  }
  
  getPosts(page) {
    this.contactService.getAllContacts(page).subscribe(res => {
      // console.log(res);
      this.response = res;
  
      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }
      console.log(this.dataListPagination)
    }, (err => {
      if (err.status === 404) {
        // this.data.length = 0
        this.contactsError = this.translate.instant('contacts-Error');
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
  
  
  // openDetail(id: number) {
  //   this.router.navigateByUrl('address/' + id);
  // }
  
  addContact() {
    this.router.navigate(['/contacts/add']);
  }
  
  
  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.dataListPagination = [];
    this.page = 1;
    this.contactsError = null;
    this.contactService.getAllContacts(this.page).subscribe(res => {
      this.response = res;
  
      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }
  
      event.target.complete();
  
    }, (err => {
      event.target.complete();
  
      if (err.status === 404) {
        this.contactsError = this.translate.instant('contacts-Error');
      }
    }));
  }
  openContact(id){
    this.router.navigate(['/contacts/'+id]);
  }
  }
  
  
  
  
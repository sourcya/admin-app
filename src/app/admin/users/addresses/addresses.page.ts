import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AddressesService } from './services/addresses.service';
import { AddAddressPage } from './add-address/add-address.page';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {

  page = 1;
  addressesError: any;
  dataListPagination = [];

  response: any;

  userEmail:any;

  dataShow = {
    title: this.translate.instant("address-title"),
    street: this.translate.instant("address-street"),
    country: this.translate.instant("address-country"),
  }

  constructor(private loadingController: LoadingController,
    private router: Router, private translate: TranslateService,
    private addressesServices: AddressesService,
    private toast: ToastService,
    public navParams: NavParams,
    public modalController: ModalController) { }


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
    this.addressesError = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.userEmail = this.navParams.get('userEmail');

      this.addressesServices.getAddressesByUser(this.userEmail,this.page).subscribe(res => {
        // console.log(res);
        this.response = res;

        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }

        loading.dismiss();

      }, (err => {
        // console.log(err);
        loading.dismiss();
        if (err.status === 404) {
          // this.data.length = 0
          this.addressesError = this.translate.instant('addresses-Error');
        }
      }));

    });
  }

  getPosts(page) {
    this.addressesServices.getAddressesByUser(this.userEmail,page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

    }, (err => {
      if (err.status === 404) {
        // this.data.length = 0
        this.addressesError = this.translate.instant('addresses-Error');
      }
    }));
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


  openDetail(id: number) {
    this.cancel();
    this.router.navigateByUrl('admin/address/' + id);
  }

  addAddress() {
    //Create Modal Page
    this.modalController.create({
      component: AddAddressPage
    }).then((modal) => {
      modal.present();
    });
  }


  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.dataListPagination = [];
    this.page = 1;
    this.addressesError = null;
    this.addressesServices.getAddressesByUser(this.userEmail,this.page).subscribe(res => {
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

      event.target.complete();

    }, (err => {
      event.target.complete();

      if (err.status === 404) {
        this.addressesError = this.translate.instant('addresses-Error');
      }
    }));
  }


}

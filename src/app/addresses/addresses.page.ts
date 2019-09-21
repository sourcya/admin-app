import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressesService } from './service/address.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, ModalController } from '@ionic/angular';
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

  dataShow = {
    title: this.translate.instant("address-title"),
    street: this.translate.instant("address-street"),
    country: this.translate.instant("address-country"),
  }

  constructor(
    public router: Router,
    private addressesService: AddressesService,
    private translate: TranslateService,
    private loadingController: LoadingController,
    public modalController: ModalController) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.addressesError = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      // this.getPosts(this.page)
      this.addressesService.getAllAddresses(this.page).subscribe(res => {
        // console.log(res);
        this.response = res;

        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }

        loading.dismiss();

      }, (err => {
        console.log(err);

        loading.dismiss();
        if (err.status === 404) {
          // this.data.length = 0
          this.addressesError = this.translate.instant('addresses-Error');
        }
      }));

    });
  }

  getPosts(page) {
    this.addressesService.getAllAddresses(page).subscribe(res => {
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
    this.router.navigateByUrl('address/' + id);
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
    this.addressesService.getAllAddresses(this.page).subscribe(res => {
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

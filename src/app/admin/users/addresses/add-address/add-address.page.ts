import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AddressesService } from '../services/addresses.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  @ViewChild('createAddress', { static: false }) createAddress: NgForm;

  countries: any;
  cities: any;
  states: any;
  info: any;

  codeCountry: any;

  model: any = {};

  dataShow = {
    title: this.translate.instant("address-title"),
    street: this.translate.instant("address-street"),
    country: this.translate.instant("address-country"),
    city: this.translate.instant("address-city"),
    state: this.translate.instant("address-state"),
    postal_code: this.translate.instant("address-postal_code"),
    district: this.translate.instant("address-district"),
    building_num: this.translate.instant("address-building_num"),
    user_email: this.translate.instant("address-user_email"),
  }

  constructor(private loadingController: LoadingController,
    private router: Router, private translate: TranslateService,
    private addressesServices: AddressesService,
    private toast: ToastService,
    public modalController: ModalController) { }

  ngOnInit() {
  }


  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter() {
    this.countries = [];
    this.states = [];
    this.cities = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.getCountries().subscribe((res) => {
        // console.log(res);
        for (let i = 0; i < res['data'].length; i++) {
          if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
            this.countries.push(res['data'][i].name)
          }
        }
        loading.dismiss();
      })
    });
  }

  changeCountry(ev) {
    this.states = [];
    console.log(ev.target.value);

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.getCountries().subscribe((res) => {
        // console.log(res);
        for (let i = 0; i < res['data'].length; i++) {
          if (res['data'][i].name == ev.target.value) {
            this.codeCountry = res['data'][i].id;
          }
        }

        this.addressesServices.getStates(this.codeCountry).subscribe((sta) => {
          console.log(sta);
          for (let i = 0; i < sta['data'].length; i++) {
            this.states.push(sta['data'][i].name)
          }
          // console.log(this.states);
          loading.dismiss();
        })
      })
    });
  }


  changeStates(ev) {
    console.log(ev.target.value);
    this.cities = null;

    let stateId;
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.getStates(this.codeCountry).subscribe(res => {
        for (let i = 0; i < res['data'].length; i++) {
          if (ev.target.value == res['data'][i].name) {
            // console.log(res['data'][i].id);
            stateId = res['data'][i].id;
            break;
          }
        }
        this.addressesServices.getCities(stateId).subscribe(cit => {
          this.cities = cit['data'];

          loading.dismiss();
        })
      })
    });
  }


  addAddress() {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.addAdress(this.createAddress.value).subscribe((res) => {
        loading.dismiss();
        this.toast.show(res['message'])

        this.cancel();
        this.router.navigate(['/admin/user' + res['data'].user.id]);

      }, (err) => {
        // console.log(err);
        loading.dismiss();
        this.toast.show(err.error.message)

      });
    });
  }





}

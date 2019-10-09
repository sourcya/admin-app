import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AddressesService } from '../services/addresses.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  addressId: any;
  data: any;
  message: any;

  countries: any;
  cities: any;
  states: any;

  codeCountry: any;
  stateId: any;

  dataShow = {
    title: this.translate.instant("address-title"),
    street: this.translate.instant("address-street"),
    country: this.translate.instant("address-country"),
    city: this.translate.instant("address-city"),
    state: this.translate.instant("address-state"),
    postal_code: this.translate.instant("address-postal_code"),
    district: this.translate.instant("address-district"),
    building_num: this.translate.instant("address-building_num"),
  }


  constructor(
    private addressesServices: AddressesService,
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
      if (params.get("id")) {
        this.addressId = params.get("id");
        // console.log(this.addressId);
      }
    });
  }


  ionViewWillEnter() {
    this.countries = [];
    this.states = [];
    this.cities = null;

    this.data = null;

    this.loadingController.create({
      message: this.translate.instant("loading")
    })
      .then(loading => {
        loading.present();
        this.addressesServices.getAddressId(this.addressId).subscribe(
          res => {
            this.data = res["data"];
            console.log(this.data);


            this.addressesServices.getCountries().subscribe((res) => {
              // console.log(res);
              for (let i = 0; i < res['data'].length; i++) {
                if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
                  this.countries.push(res['data'][i].name)
                }
                if (res['data'][i].name == this.data.country) {
                  this.codeCountry = res['data'][i].id;
                }
              }

              this.addressesServices.getStates(this.codeCountry).subscribe((sta) => {
                for (let i = 0; i < sta['data'].length; i++) {
                  this.states.push(sta['data'][i].name)
                  if (sta['data'][i].name == this.data.state) {
                    this.stateId = sta['data'][i].id;
                  }
                }

                this.addressesServices.getCities(this.stateId).subscribe(cit => {
                  this.cities = cit['data'];

                  loading.dismiss();

                })
              })
            })

          },
          err => {
            loading.dismiss();
            if (err.status === 404) {
              // this.data.length = 0
            }
          }
        );
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

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.getStates(this.codeCountry).subscribe(res => {
        for (let i = 0; i < res['data'].length; i++) {
          if (ev.target.value == res['data'][i].name) {
            // console.log(res['data'][i].id);
            this.stateId = res['data'][i].id;
            break;
          }
        }
        this.addressesServices.getCities(this.stateId).subscribe(cit => {
          if (cit['data'].length > 0) {
            this.cities = cit['data'];
          }
          else {
            this.cities = null;
          }
          loading.dismiss();
        })
      })
    });
  }


  edit(address) {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.addressesServices.editAddressId(this.addressId, address.value).subscribe(res => {
        loading.dismiss();

        this.toast.show(res['message']);
        this.router.navigate(['/admin/user/' + this.data.user.id]);

      }, err => {
        loading.dismiss();

        this.toast.show(err.error.message)
      })
    });

  }

  deleteAddress() {
    this.alertCtrl.create({
      message: this.translate.instant('address-message'),
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

            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();

              this.addressesServices.deleteAddress(this.addressId).subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);

                this.router.navigate(['/admin/user/' + this.data.user.id]);
              },
                (err) => {
                  loading.dismiss();
                  this.toast.show(err.error.message);
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

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AddCityPage } from './add-city/add-city.page';
import { EditCityPage } from './edit-city/edit-city.page';
import { ToastService } from 'src/app/lib/services/toast.service';
import { CitiesService } from './services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  dataShow = {
    city: this.translate.instant('address-city'),
    state: this.translate.instant('address-state'),
  };

  data: any;

  citiesError: any;

  constructor(private translate: TranslateService,
    private loadingController: LoadingController,
    private citiesServices: CitiesService,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private toast: ToastService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.data = null;
    this.citiesError = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then(loading => {
      loading.present();

      this.citiesServices.getAllCities().subscribe(res => {
        console.log(res);

        this.data = res['data'];
        loading.dismiss();
      }, err => {
        loading.dismiss();
        if (err.status === 404) {
          // this.data.length = 0
          this.citiesError = this.translate.instant('cities-Error');
        }
      });
    });
  }


  addcity() {
    // Create Modal Page
    this.modalController.create({
      component: AddCityPage
    }).then((modal) => {
      modal.present();
    });
  }

  edit(id) {
    // Create Modal Page
    this.modalController.create({
      component: EditCityPage,
      componentProps: {
        'cityId': id,
      }
    }).then((modal) => {
      modal.present();
    });
  }

  delete(id) {
    this.alertCtrl.create({
      message: this.translate.instant('city-message'),
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

              this.citiesServices.deleteCityId(id).subscribe(res => {

                this.data = [];
                this.citiesError = null;
                this.citiesServices.getAllCities().subscribe(res => {
                  // console.log(res);
                  this.data = res['data'];
                  loading.dismiss();
                  this.toast.show(this.translate.instant('city-deleteValid'));

                }, err => {
                  loading.dismiss();
                  this.toast.show(this.translate.instant('city-deleteValid'));

                  if (err.status === 404) {
                    // this.data.length = 0
                    this.citiesError = this.translate.instant('cities-Error');
                  }
                });

              },
                (err) => {
                  loading.dismiss();
                  this.toast.show(this.translate.instant(err.errors['errors'].name));
                  // if (err.status === 500) {
                  //   this.toast.show(this.translate.instant('error-500'));
                  // }
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

  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.data = [];
    this.citiesError = null;
    this.citiesServices.getAllCities().subscribe(res => {
      // console.log(res);
      this.data = res['data'];
      event.target.complete();
    }, err => {
      event.target.complete();
      if (err.status === 404) {
        // this.data.length = 0
        this.citiesError = this.translate.instant('cities-Error');
      }
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, AlertController } from '@ionic/angular';
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

  data = [];

  citiesError: any;

  page = 1;
  response: any;

  constructor(private translate: TranslateService,
    private citiesServices: CitiesService,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    private toast: ToastService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.data = [];
    this.citiesError = null;
    this.page = 1;

    this.getCities(this.page);
  }

  getCities(pageNum) {
    this.citiesServices.getAllCities(pageNum).subscribe(res => {
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.data.push(res['data'][index]);
      }
      
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

            this.citiesServices.deleteCityId(id).subscribe(res => {
              this.toast.show(res['message']);

              this.data = [];
              this.citiesError = null;
              this.page =1;
              this.getCities(this.page);

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
    this.page =1;
    this.getCities(this.page);

    event.target.complete();
  }

  ////pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getCities(this.page);
        }
        event.target.complete();
        // console.log(this.dataListPagination);
        if (this.data.length == this.response.meta.total) {
          event.target.disabled = true;
        }
      }
      else {
        event.target.disabled = true;
      }

    }, 500);
  }

}

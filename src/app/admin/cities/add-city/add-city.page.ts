import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.page.html',
  styleUrls: ['./add-city.page.scss'],
})
export class AddCityPage implements OnInit {

  @ViewChild('createCity', { static: false }) createCity: NgForm;

  states: any;
  countries: any;
  message: any;
  constructor(private loadingController: LoadingController,
    private translate: TranslateService,
    private toast: ToastService,
    public modalController: ModalController,
    private citiesServices: CitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.states = [];
    this.countries = [];

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.citiesServices.getCountries().subscribe(res => {
        for (let i = 0; i < res['data'].length; i++) {
          if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
            this.countries.push(res['data'][i])
          }
        }
        loading.dismiss();
        
      },err =>{
        loading.dismiss();
        this.toast.show(err.error.message)
      })
    });
  }

  changeCountry(ev) {
    this.states = [];
    // console.log(ev.target.value);

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.citiesServices.getStates(ev.target.value).subscribe((sta) => {
        // console.log(sta);
        for (let i = 0; i < sta['data'].length; i++) {
          this.states.push(sta['data'][i])
        }
        // console.log(this.states);
        loading.dismiss();
      })
    });
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  addCity() {
    // console.log(this.createCity.value);

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.citiesServices.postCity(this.createCity.value).subscribe(res => {
        // console.log(res);

        loading.dismiss();

        this.toast.show(this.translate.instant(res['message']))
        this.cancel();
      }, err => {
        // console.log(err)
        loading.dismiss();
        this.message = err.error;
        let responseErrors = this.message.errors
        let responseErrorsArray = Object.entries(responseErrors)
        for (let i = 0; i <= responseErrorsArray.length - 1; i++) {
          // console.log(responseErrorsArray[i][0] + ":" + responseErrorsArray[i][1]);
          this.message = responseErrorsArray[i][1];
          // console.log(this.message);
          this.toast.show(this.translate.instant(this.message[0]))
        }
      })
    });
  }


}

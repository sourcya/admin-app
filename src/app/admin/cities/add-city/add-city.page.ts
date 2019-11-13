import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(private translate: TranslateService,
    private toast: ToastService,
    public modalController: ModalController,
    private citiesServices: CitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.states = [];
    this.countries = [];

    this.citiesServices.getCountries().subscribe(res => {
      for (let i = 0; i < res['data'].length; i++) {
        if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
          this.countries.push(res['data'][i])
        }
      }
    });
  }

  changeCountry(ev) {
    this.states = [];
    // console.log(ev.target.value);
      this.citiesServices.getStates(ev.target.value).subscribe((sta) => {
        // console.log(sta);
        for (let i = 0; i < sta['data'].length; i++) {
          this.states.push(sta['data'][i])
        }
        // console.log(this.states);
    });
  }


  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  addCity() {
    // console.log(this.createCity.value);
      this.citiesServices.postCity(this.createCity.value).subscribe(res => {
        // console.log(res);
        this.toast.show(this.translate.instant(res['message']))
        this.cancel();
    });
  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.page.html',
  styleUrls: ['./register-agent.page.scss'],
})
export class RegisterAgentPage implements OnInit {

  @ViewChild('registerAgent', { static: false }) registerAgent: NgForm;

  dataShow = {
    Msg: this.translate.instant('Msg'),
    country: this.translate.instant("address-country"),
    city: this.translate.instant("address-city"),
    state: this.translate.instant("address-state"),
  }

  countries: any;
  cities: any;
  states: any;

  constructor(public modalController: ModalController,
    private translate: TranslateService,
    private loadingController: LoadingController,
    public toast: ToastService,
    private agentService: AgentService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.countries = [];
    this.states = [];
    this.cities = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.agentService.getCountries().subscribe((res) => {
        // console.log(res);
        for (let i = 0; i < res['data'].length; i++) {
          if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
            this.countries.push(res['data'][i])
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

      this.agentService.getStates(ev.target.value).subscribe((sta) => {
        console.log(sta);
        for (let i = 0; i < sta['data'].length; i++) {
          this.states.push(sta['data'][i]);
        }
        // console.log(this.states);
        loading.dismiss();
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

      this.agentService.getCities(ev.target.value).subscribe(cit => {
        this.cities = cit['data'];

        loading.dismiss();
      })

    });
  }


  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  register() {

    let attributes_name = [];
    attributes_name[0] = "Message";

    let keys = [];
    keys[0] = "msg0";

    let values = [];
    values[0] = this.registerAgent.value.value

    console.log(this.registerAgent.value);
    let data: any = {
      city_id: this.registerAgent.value.city_id,
      attributes_name: attributes_name,
      keys: keys,
      values: values,
    }


    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.agentService.PostRegisterAgent(data).subscribe(res => {
        loading.dismiss();
        this.toast.show(res['message'])

        this.cancel();
      }, err => {
        loading.dismiss();
        this.toast.show(err.error.message)
      })

    });
  }


}

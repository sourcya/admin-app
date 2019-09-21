import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.page.html',
  styleUrls: ['./edit-city.page.scss'],
})
export class EditCityPage implements OnInit {

  @ViewChild('cityForm', { static: false }) cityForm: NgForm;
  countries:any=[];
  cityId: any;
  states: any;
  stateId:any;
  countryId:any;
  stateName:any;
  data:any;
  cityName:any;
  constructor(public modalController: ModalController,
    public navParams: NavParams,
    private translate: TranslateService,
    private loadingController: LoadingController,
    private toast: ToastService,
    private adminService: AdminService) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.states = [];
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      // loading.present();

      console.log(this.navParams.get('cityId'));
      this.cityId = this.navParams.get('cityId');
      this.adminService.getCityId(this.cityId).subscribe(res => {
        console.log(res);
        this.data=res['data'];
        this.countryId = this.data.state.country.id;
        this.stateId= this.data.state.id;
        this.cityName=this.data.name;
        console.log(this.countryId)
        this.adminService.getCountries().subscribe(res => {
          for (let i = 0; i < res['data'].length; i++) {
            if (res['data'][i].name == 'Saudi Arabia' || res['data'][i].name == 'Egypt') {
              this.countries.push(res['data'][i])
            }
          }
          loading.dismiss();
        })
        // loading.dismiss();
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

      this.adminService.getStates(ev.target.value).subscribe((sta) => {
        console.log(sta);
        for (let i = 0; i < sta['data'].length; i++) {
          this.states.push(sta['data'][i])
        }
        // console.log(this.states);
        loading.dismiss();
      })
    });
  }
      // this.adminService.getStates().subscribe((sta) => {
      //   // console.log(sta);
      //   for (let i = 0; i < sta['data'].length; i++) {
      //     if (sta['data'][i].country == 'Saudi Arabia' || sta['data'][i].country == 'Egypt') {
      //       this.states.push(sta['data'][i])
      //     }
      //   }
      //   // console.log(this.states);

       
    //   })
    // });
  // }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  changeStates(ev){
    this.stateName = null;
    // console.log(ev.target.value);
  }

  editCity(){
    // console.log(this.cityForm.value);    
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminService.updateCity(this.cityId ,this.cityForm.value).subscribe(res =>{
        console.log(res);
        
        loading.dismiss();
       
        this.toast.show(this.translate.instant('edit-city-valid'))
        this.cancel();
      },err =>{
        console.log(err)

        loading.dismiss();

        if (err.status === 401) {
          this.toast.show(this.translate.instant('error-401'));
        }

        if (err.status === 404) {
          this.toast.show(this.translate.instant('error-404'));
        }
        if (err.status === 422) {

          this.toast.show(this.translate.instant('error-422'));

        }
        if (err.status === 500) {
          this.toast.show(this.translate.instant('error-500'));
        }
      })
    });

  }



}

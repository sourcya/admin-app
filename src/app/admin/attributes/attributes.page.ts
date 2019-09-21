import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../services/admin.service';
import { AddAttributesPage } from './add-attributes/add-attributes.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  page = 1;
  attributesError: any;
  dataListPagination = [];

  response: any;

  dataShow = {
    assigned_for: this.translate.instant("assigned_for"),
    type: this.translate.instant("type"),
    attribute: this.translate.instant("attribute"),
  }

  
  constructor(private translate: TranslateService,
    private adminService: AdminService, public router: Router,
    public modalController: ModalController,
    private loadingController: LoadingController,) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.attributesError = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.adminService.getAllAttributes(this.page).subscribe(res => {
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
          this.attributesError = this.translate.instant('attributes-Error');
        }
      }));

    });
  }


  addAttributes(){
    this.modalController.create({
      component: AddAttributesPage
    }).then((modal) => {
      modal.present();
    });
  }

  getPosts(page) {
    this.adminService.getAllAttributes(page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

    }, (err => {
      console.log(err);

      if (err.status === 404) {
        // this.data.length = 0
        this.attributesError = this.translate.instant('attributes-Error');
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
    this.router.navigateByUrl('admin/attribute/' + id);
  }


  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.dataListPagination = [];
    this.page = 1;
    this.attributesError = null;
    this.adminService.getAllAttributes(this.page).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }

      event.target.complete();

    }, (err => {
      event.target.complete();

      if (err.status === 404) {
        this.attributesError = this.translate.instant('attributes-Error');
      }
    }));
  }

  

}

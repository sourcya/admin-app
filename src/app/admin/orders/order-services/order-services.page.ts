import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order-services',
  templateUrl: './order-services.page.html',
  styleUrls: ['./order-services.page.scss'],
})
export class OrderServicesPage implements OnInit {
  
  page = 1;
  dataListPagination = [];

  response: any;

  constructor(private service: OrdersService,
    private translate: TranslateService,
    private toast: ToastService,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();
      this.service.getAllServices(this.page).subscribe(res => {
        // console.log(res);
        this.response = res;
        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.toast.show(err.error.message)
      })
    });
  }


  getPosts(pageNum) {
    this.service.getAllServices(pageNum).subscribe(res => {
      // console.log(res);
      this.response = res;
      for (let index = 0; index < this.response.data.length; index++) {
        this.dataListPagination.push(this.response.data[index]);
      }
    }, err => {
      this.toast.show(err.error.message)
    })
  }


  // //pagination
  loadDataPagination(event) {
    setTimeout(() => {
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          this.getPosts(this.page);
        }
        event.target.complete();
        if (this.dataListPagination.length == this.response.meta.total) {
          event.target.disabled = true;
        }
      }
      else {
        event.target.disabled = true;
      }
    }, 500);
  }



  ionRefresh(event) {
    this.dataListPagination = [];
    this.page = 1;
   
      this.service.getAllServices(this.page).subscribe(res => {
        // console.log(res);
        this.response = res;
        for (let index = 0; index < this.response.data.length; index++) {
          this.dataListPagination.push(this.response.data[index]);
        }
        event.target.complete();
      }, err => {
        event.target.complete();
        this.toast.show(err.error.message)
      })
  }

  
}

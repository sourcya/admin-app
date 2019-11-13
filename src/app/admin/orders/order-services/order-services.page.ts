import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ToastService } from 'src/app/lib/services/toast.service';

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
    private toast: ToastService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;

    this.getPosts(this.page);
  }


  getPosts(pageNum) {
    this.service.getAllServices(pageNum).subscribe(res => {
      // console.log(res);
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.dataListPagination.push(res['data'][index]);
      }
    });
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

    this.getPosts(this.page);
    event.target.complete();

  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  dataShow={
    orders:this.translate.instant('orders'),
    inProgress:this.translate.instant('in-progress'),
    draft:this.translate.instant('draft'),
    finished:this.translate.instant('finished')


  }
  @ViewChild('slider', { static: false }) slider: IonSlides;
  @ViewChild(IonContent,{ static: false }) content: IonContent;
  page = '0';
  inProgress: any;
  draft: any;
  finished: any;
  myOrders = [
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Draft',
      date: '03/05/2019',
      billing: 'Cash'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Need Validation',
      date: '03/05/2019',
      billing: 'Online'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Validated',
      date: '03/05/2019',
      billing: 'Cash'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Rejected',
      date: '03/05/2019',
      billing: 'Online'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Assigned',
      date: '03/05/2019',
      billing: 'Cash'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Delivered',
      date: '03/05/2019',
      billing: 'Online'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Draft',
      date: '03/05/2019',
      billing: 'Cash'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Rejected',
      date: '03/05/2019',
      billing: 'Online'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Validated',
      date: '03/05/2019',
      billing: 'Cash'
    },
    {
      code: '45673878',
      price: '300 SAR',
      status: 'Draft',
      date: '03/05/2019',
      billing: 'Online'
    }
  ];

  constructor( private translate: TranslateService) {
    this.filter();
  }

  ngOnInit() {
    this.filter();
  }
  selectedTab(index) {
    this.content.scrollToTop();
    this.slider.slideTo(index);
  }

  async moveButton() {
    const index = await this.slider.getActiveIndex();
    this.page = index.toString();
  }
  onActivate() {
    window.scroll(0, 0);
  }
  filter() {
    this.inProgress = this.myOrders.filter(
      it =>
        it.status === 'Need Validation' ||
        it.status === 'Validated' ||
        it.status === 'Assigned'
    );
    this.draft = this.myOrders.filter(it => it.status === 'Draft');
    this.finished = this.myOrders.filter(
      it => it.status === 'Rejected' || it.status === 'Delivered'
    );
  }
}


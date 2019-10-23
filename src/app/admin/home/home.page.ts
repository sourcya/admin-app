import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  admin = {
    users: this.translate.instant('users'),
    roles: this.translate.instant('roles'),
    agents: this.translate.instant('agents'),
    attributes: this.translate.instant('attributes'),
    cities: this.translate.instant('cities'),
    orders: this.translate.instant('orders'),
    notifications: this.translate.instant('Notifications'),
    services: this.translate.instant('services'),
  }

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  admin = {
    users: this.translate.instant('users'),
    roles: this.translate.instant('roles'),
    agents: this.translate.instant('agents'),
    attributes: this.translate.instant('attributes'),
    contacts :this.translate.instant('contacts'),
    cities: this.translate.instant('cities'),
    addresses : this.translate.instant('addresses'),
    orders:this.translate.instant('orders'),
    notifications: this.translate.instant('Notifications'),
  }
  constructor(public modalController: ModalController,
    public router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  open() {
    this.cancel()
    this.router.navigate(['/admin/users']);

  }
  openRoles() {

    this.cancel()
    this.router.navigate(['/admin/roles']);
  }

  openAgents() {
    this.cancel()
    this.router.navigate(['/admin/agents']);
  }

  openAttributes() {
    this.cancel();
    this.router.navigate(['/admin/attributes']);
  }

  openContacts(){
    this.cancel();
    this.router.navigate(['/admin/contacts']);  
  }

  openCities(){
    this.cancel();
    this.router.navigate(['/admin/cities']); 
  }

  openAddresses(){
    this.cancel();
    this.router.navigate(['/admin/addresses']);
  }
  openOrders(){
    this.cancel();
    this.router.navigate(['/admin/orders']);
  }

  openNotifications(){
    this.cancel();
    this.router.navigate(['/admin/notifications']);
  }

}

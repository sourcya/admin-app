import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-filter',
  templateUrl: './roles-filter.page.html',
  styleUrls: ['./roles-filter.page.scss'],
})
export class RolesFilterPage implements OnInit {
  constructor(public modalController: ModalController,
    private translate: TranslateService,
     private router: Router) { }

  ngOnInit() {
  }
  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  search(){
    console.log('ok')
    this.router.navigate(['/products']);
    this.cancel()
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.page.html',
  styleUrls: ['./users-filter.page.scss'],
})
export class UsersFilterPage implements OnInit {
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

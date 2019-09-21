import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressesPage } from './addresses.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddAddressPage } from './add-address/add-address.page';

const routes: Routes = [
  {
    path: '',
    component: AddressesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddressesPage, AddAddressPage],
  entryComponents:[AddAddressPage]
})
export class AddressesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RolesPage } from './roles.page';
import { TranslateModule } from '@ngx-translate/core';
import { RolesFilterPage } from '../roles-filter/roles-filter.page';

const routes: Routes = [
  {
    path: '',
    component: RolesPage
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
   entryComponents:[RolesFilterPage],
  declarations: [RolesPage,RolesFilterPage]
})
export class RolesPageModule {}

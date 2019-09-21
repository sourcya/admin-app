import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CitiesPage } from './cities.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddCityPage } from './add-city/add-city.page';
import { EditCityPage } from './edit-city/edit-city.page';

const routes: Routes = [
  {
    path: '',
    component: CitiesPage
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
  declarations: [CitiesPage, AddCityPage, EditCityPage],
  entryComponents:[AddCityPage, EditCityPage]
})
export class CitiesPageModule {}

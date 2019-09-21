import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttributesPage } from './attributes.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddAttributesPage } from './add-attributes/add-attributes.page';

const routes: Routes = [
  {
    path: '',
    component: AttributesPage
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
  declarations: [AttributesPage, AddAttributesPage],
  entryComponents: [AddAttributesPage]
})
export class AttributesPageModule {}

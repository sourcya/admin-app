import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsersPage } from './users.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddUserPage } from '../add-user/add-user.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
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
  entryComponents:[AddUserPage],
  declarations: [UsersPage, AddUserPage]
})
export class UsersPageModule {}

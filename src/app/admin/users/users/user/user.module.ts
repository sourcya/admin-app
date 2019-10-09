import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserPage } from './user.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddressesPage } from '../../addresses/addresses.page';
import { AddAddressPage } from '../../addresses/add-address/add-address.page';
import { EditUserPage } from '../edit-user/edit-user.page';
import { ContactsPage } from '../../contacts/contacts.page';
import { AddContactPage } from '../../contacts/add-contact/add-contact.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
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
  declarations: [UserPage, AddressesPage, AddAddressPage, ContactsPage, AddContactPage, EditUserPage],
  entryComponents: [AddressesPage, AddAddressPage, ContactsPage, AddContactPage, EditUserPage]
})
export class UserPageModule { }

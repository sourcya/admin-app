import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: 'src/app/admin/home/home.module#HomePageModule'
      },
      {
        path: 'agents',
        loadChildren: 'src/app/admin/agents/agents/agents.module#AgentsPageModule'
      },
      {
        path: 'attributes',
        loadChildren: 'src/app/admin/attributes/attributes.module#AttributesPageModule'
      },
      {
        path: 'attribute/:id',
        loadChildren: 'src/app/admin/attributes/attribute/attribute.module#AttributePageModule'
      },
      {
        path: 'contacts/:id', 
        loadChildren: 'src/app/admin/users/contacts/edit-contact/edit-contact.module#EditContactPageModule'
      },
      {
        path: 'users',
        loadChildren: 'src/app/admin/users/users/users/users.module#UsersPageModule'
      },
      {
        path: 'user/:id',
        loadChildren: 'src/app/admin/users/users/user/user.module#UserPageModule'
      },
      {
        path: 'roles',
        loadChildren: 'src/app/admin/roles/roles/roles.module#RolesPageModule'
      },
      {
        path: 'role/:code',
        loadChildren: 'src/app/admin/roles/role-code/role-code.module#RoleCodePageModule'
      },
      {
        path: 'cities',
        loadChildren: 'src/app/admin/cities/cities.module#CitiesPageModule'
      },
      {
        path: 'address/:id',
        loadChildren: 'src/app/admin/users/addresses/address/address.module#AddressPageModule'
      },
      {
        path: 'orders',
        loadChildren: 'src/app/admin/orders/orders/orders.module#OrdersPageModule'
      },
      {
        path: 'orders/add',
        loadChildren: 'src/app/admin/orders/orders/add-order/add-order.module#AddOrderPageModule'
      },
      {
        path: 'notifications',
        loadChildren: 'src/app/admin/notifications/notifications.module#NotificationsPageModule'
      }
    ]
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
  declarations: [MenuPage]
})
export class MenuPageModule { }

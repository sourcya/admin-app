
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './lib/route-guards/user.guard';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [UserGuard] },
  { path: 'auth', loadChildren: './core/start/start.module#StartPageModule' },
  { path: 'login', loadChildren: './core/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './core/register/register.module#RegisterPageModule' },
  { path: 'notifications', loadChildren: './core/notifications/notifications.module#NotificationsPageModule', canActivate: [UserGuard] },
  { path: 'about', loadChildren: './core/about/about.module#AboutPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [UserGuard] },
  
  { path: 'admin/users', loadChildren: './admin/users/users/users.module#UsersPageModule' },
  { path: 'admin/user/:id', loadChildren: './admin/users/edit-user/edit-user.module#EditUserPageModule' },
  { path: 'admin/users/add-user', loadChildren: './admin/users/add-user/add-user.module#AddUserPageModule' },
  
  { path: 'admin/roles', loadChildren: './admin/roles/roles/roles.module#RolesPageModule' },
  { path: 'admin/roles/:code/role', loadChildren: './admin/roles/role-code/role-code.module#RoleCodePageModule' },
  { path: 'admin/roles/add-role', loadChildren: './admin/roles/add-role/add-role.module#AddRolePageModule' },
  { path: 'admin/roles/:code/edit-role', loadChildren: './admin/roles/edit-role/edit-role.module#EditRolePageModule' },
  
  { path: 'addresses', loadChildren: './addresses/addresses.module#AddressesPageModule' , canActivate: [UserGuard] },
  { path: 'address/:id', loadChildren: './addresses/address/address.module#AddressPageModule' , canActivate: [UserGuard]},
  
  { path: 'admin/agents', loadChildren: './admin/agents/agents/agents.module#AgentsPageModule' },
  
  { path: 'admin/attributes', loadChildren: './admin/attributes/attributes.module#AttributesPageModule' , canActivate: [UserGuard]},
  { path: 'admin/attribute/:id', loadChildren: './admin/attributes/attribute/attribute.module#AttributePageModule' , canActivate: [UserGuard] },

  { path: 'admin/contacts', loadChildren: './admin/contacts/contacts/contacts.module#ContactsPageModule' },
  { path: 'admin/contacts/add', loadChildren: './admin/contacts/contacts/add-contact/add-contact.module#AddContactPageModule' },
  { path: 'admin/contacts/:id', loadChildren: './admin/contacts/contacts/edit-contact/edit-contact.module#EditContactPageModule' },
  
  { path: 'contacts', loadChildren: './contacts/contacts/contacts.module#ContactsPageModule' },
  { path: 'contacts/add', loadChildren: './contacts/contacts/add-contact/add-contact.module#AddContactPageModule' },
  { path: 'contacts/:id', loadChildren: './contacts/contacts/edit-contact/edit-contact.module#EditContactPageModule' },
  
  { path: 'admin/cities', loadChildren: './admin/cities/cities.module#CitiesPageModule' , canActivate: [UserGuard] },

  { path: 'admin/addresses', loadChildren: './admin/addresses/addresses.module#AddressesPageModule' , canActivate: [UserGuard] },
  { path: 'admin/address/:id', loadChildren: './admin/addresses/address/address.module#AddressPageModule' , canActivate: [UserGuard]},
  { path: 'admin/orders', loadChildren: './admin/orders/orders/orders.module#OrdersPageModule' },
  { path: 'admin/orders/add', loadChildren: './admin/orders/orders/add-order/add-order.module#AddOrderPageModule' },
  
  { path: 'admin/notifications', loadChildren: './admin/notifications/notifications.module#NotificationsPageModule', canActivate: [UserGuard] },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/lib/route-guards/user.guard';
import { AdminGuard } from 'src/app/lib/route-guards/admin.guard';
const routes: Routes = [
//CORE Routes
{ path: '', redirectTo: 'admin', pathMatch: 'full' },
{ path: 'admin', loadChildren: './admin/menu/menu.module#MenuPageModule' , canActivate: [UserGuard,AdminGuard]},

  { path: 'login', loadChildren: 'src/app/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: 'src/app/auth/register/register.module#RegisterPageModule' },



  // { path: 'about', loadChildren: 'src/app/core/about/about.module#AboutPageModule' },
  // { path: 'home', loadChildren: 'src/app/core/home/home.module#HomePageModule', canActivate: [UserGuard] },
  // { path: 'notifications', loadChildren: 'src/app/core/notifications/notifications.module#NotificationsPageModule', canActivate: [UserGuard] },
  // { path: 'profile', loadChildren: 'src/app/core/user/profile/profile.module#ProfilePageModule', canActivate: [UserGuard] },
  // { path: 'address/:id', loadChildren: 'src/app/core/user/addresses/address/address.module#AddressPageModule' , canActivate: [UserGuard]},
  // { path: 'contacts/:id', loadChildren: 'src/app/core/user/contacts/edit-contact/edit-contact.module#EditContactPageModule' , canActivate: [UserGuard]},


//ADMIN Routes
  // { path: 'home', loadChildren: './admin/home/home.module#HomePageModule' },
  // { path: 'admin/agents', loadChildren: './admin/agents/agents/agents.module#AgentsPageModule' },

  // { path: 'admin/attributes', loadChildren: './admin/attributes/attributes.module#AttributesPageModule' , canActivate: [UserGuard]},
  // { path: 'admin/attribute/:id', loadChildren: './admin/attributes/attribute/attribute.module#AttributePageModule' , canActivate: [UserGuard] },

  // { path: 'admin/contacts/add', loadChildren: './admin/contacts/contacts/add-contact/add-contact.module#AddContactPageModule' },
  // { path: 'admin/contacts/:id', loadChildren: './admin/contacts/contacts/edit-contact/edit-contact.module#EditContactPageModule' },

  // { path: 'admin/users', loadChildren: './admin/users/users/users.module#UsersPageModule' },
  // { path: 'admin/user/:id', loadChildren: './admin/users/edit-user/edit-user.module#EditUserPageModule' },
  // { path: 'admin/users/add-user', loadChildren: './admin/users/add-user/add-user.module#AddUserPageModule' },

  // { path: 'admin/roles', loadChildren: './admin/roles/roles/roles.module#RolesPageModule' },
  // { path: 'admin/roles/:code/role', loadChildren: './admin/roles/role-code/role-code.module#RoleCodePageModule' },
  // { path: 'admin/roles/add-role', loadChildren: './admin/roles/add-role/add-role.module#AddRolePageModule' },
  // { path: 'admin/roles/:code/edit-role', loadChildren: './admin/roles/edit-role/edit-role.module#EditRolePageModule' },

  // { path: 'admin/cities', loadChildren: './admin/cities/cities.module#CitiesPageModule' , canActivate: [UserGuard] },

  // { path: 'admin/address/:id', loadChildren: './admin/addresses/address/address.module#AddressPageModule' , canActivate: [UserGuard]},

  // { path: 'admin/orders', loadChildren: './admin/orders/orders/orders.module#OrdersPageModule' },
  // { path: 'admin/orders/add', loadChildren: './admin/orders/orders/add-order/add-order.module#AddOrderPageModule' },

  // { path: 'admin/notifications', loadChildren: './admin/notifications/notifications.module#NotificationsPageModule', canActivate: [UserGuard] },

  // { path: 'user', loadChildren: './admin/users/users/user/user.module#UserPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

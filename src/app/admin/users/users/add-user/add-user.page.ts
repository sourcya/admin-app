import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/lib/services/toast.service';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  user = {
    addUser: this.translate.instant('add-user'),
    firstName: this.translate.instant('first-name'),
    lastName: this.translate.instant('last-name'),
    email: this.translate.instant('email'),
    password: this.translate.instant('password'),
    confirmPassword: this.translate.instant('confirm-password'),
    selectRoles: this.translate.instant('select-roles'),
    create: this.translate.instant('create')
  }

  Roles = [
    "Agent",
    "Client",
    "Admin",
  ];

  constructor(
    private userService: UsersService,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
    public modalController: ModalController
  ) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addUser(userForm) {
    this.userService.postUser(userForm.value).subscribe(res => {
      this.toast.show(res['message']);
      this.router.navigate(['/admin/users']);
      this.cancel();
    });
  }


}
import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/lib/services/translate-config.service';
import { UserState } from 'src/app/lib/helpers/user-state';
import { Router, RouterEvent } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { LogOutService } from 'src/app/lib/services/logout.service';
import { UsersService } from '../users/users/services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  data: any;
  token: any;
  userId: any;
  direction: string;
  menuDir: string

  selectedPath = '';

  pages = [
    {
      title: 'sideMenu-home',
      url: '/admin/home',
      icon: 'home'
    },
    {
      title: 'users',
      url: '/admin/users',
      icon: 'contacts'
    },
    {
      title: 'roles',
      url: '/admin/roles',
      icon: 'lock'
    },
    {
      title: 'agents',
      url: '/admin/agents',
      icon: 'bicycle'
    },
    {
      title: 'attributes',
      url: '/admin/attributes',
      icon: 'grid'
    },
    {
      title: 'cities',
      url: '/admin/cities',
      icon: 'alert'
    },
    {
      title: 'orders',
      url: '/admin/orders',
      icon: 'filing'
    },
    {
      title: 'Notifications',
      url: '/admin/notifications',
      icon: 'notifications-outline'
    },
  ];


  public userName ;
  public selectedLanguage = localStorage.getItem('language')

  constructor(private translateConfigService: TranslateConfigService,
    public router: Router,
    public userState: UserState,
    private alertCtrl: AlertController, 
    private toast: ToastService,
    private translate: TranslateService,
    private loadingController: LoadingController,
    private logoutServices: LogOutService,
    private userService: UsersService,
  ) {

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    if (this.selectedLanguage) {
      this.translateConfigService.setLanguage(this.selectedLanguage);
      if (this.selectedLanguage == "ar") {
        this.direction = "rtl";
        this.menuDir = "end";
      } else {
        this.direction = "ltr";
        this.menuDir = "start";
      }
    } else {
      this.translateConfigService.getDefaultLanguage();
    }

  }
  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.getUserId( localStorage.getItem('userId')).subscribe((res) => {
      this.userName = res['data'].first_name + " " + res['data'].last_name;
    });
  }



  logOut() {

    this.alertCtrl.create({
      message: this.translate.instant('logout-message'),
      buttons: [
        {
          text: this.translate.instant('allDevice'),
          handler: () => {
            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();
              this.logoutServices.logoutAllDevices().subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);
                this.token = null;
                this.userName = null;
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                localStorage.removeItem('roles');
                this.router.navigate(['/login']);
              },err => {
                loading.dismiss();
                this.toast.show(err.message);
              })
            })
          }
        }, {
          text: this.translate.instant('thisDevice'),
          handler: () => {
            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();
              this.logoutServices.logout().subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);

                this.token = null;
                this.userName = null;
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                localStorage.removeItem('roles')
                this.router.navigate(['/login']);
              },err => {
                loading.dismiss();
                this.toast.show(err.message);
              })
            })
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

  changeLanguage() {
    localStorage.setItem('language', this.selectedLanguage);
    this.translateConfigService.setLanguage(this.selectedLanguage);
    if (this.selectedLanguage == 'ar') {
      this.direction = "rtl";
      this.menuDir = "end";
      window.location.reload();
    } else {
      this.direction = "ltr";
      this.menuDir = "start";
      window.location.reload();

    }
  }


}

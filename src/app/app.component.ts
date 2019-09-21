import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { Plugins, Capacitor } from '@capacitor/core';
import { Router, RouterEvent } from '@angular/router';
import { GetDataService } from 'src/app/lib/services/get-data.service';
import { AuthService } from 'src/app/lib/services/auth.service';
import { TranslateConfigService } from 'src/app/lib/services/translate-config.service';
import { AdminPage } from './admin/admin.page';
import { RegisterAgentPage } from './agent/register-agent/register-agent.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {

  form: FormGroup;
  data: any;
  token: any;
  userId: any;
  direction: string;
  menuDir: string

  selectedPath = '';

  pages = [
    {
      title: 'sideMenu-home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'sideMenu-addresses',
      url: '/addresses',
      icon: 'pin'
    },
    {
      title: 'sideMenu-notifications',
      url: '/notifications',
      icon: 'notifications-outline'
    },
    {
      title: 'contacts',
      url: '/contacts',
      icon: 'call'
    },
    {
      title: 'sideMenu-about',
      url: '/about',
      icon: 'alert'
    },
  ];


  public userName = localStorage.getItem('username');
  public selectedLanguage = localStorage.getItem('language')

  constructor(
    private platform: Platform,
    private translateConfigService: TranslateConfigService,
    public router: Router,
    public get: GetDataService,
    public auth: AuthService,
    public modalController: ModalController
  ) {

    this.initializeApp();


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


  initializeApp() {
    this.platform.ready().then(() => {
      // if (Capacitor.isPluginAvailable('splashScreen')) {
      Plugins.SplashScreen.hide();
      // }

    });
  }


  logOut() {
    this.token = null;
    this.userName = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/auth']);
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

  agent(){
    this.modalController.create({
      component: RegisterAgentPage
    }).then((modal) => {
      modal.present();
    }); 
  }

  admin(){
    this.modalController.create({
      component: AdminPage
    }).then((modal) => {
      modal.present();
    }); 
  }


}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateConfigService } from './lib/services/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
   styleUrls: ['./app.scss'],
})
export class AppComponent {
  public selectedLanguage = localStorage.getItem('language')
  direction: string;
  menuDir: string

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateConfigService: TranslateConfigService,
  ) {

    this.initializeApp();

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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EqualValidator } from './lib/helpers/equal-validator';
import { ToastService } from './lib/services/toast.service';
import { HttpConfigInterceptor } from './lib/interceptor/interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGuard } from './lib/route-guards/user.guard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './lib/services/translate-config.service';
import { UserState } from 'src/app/lib/helpers/user-state';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,
    EqualValidator,
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (LanguageLoader), deps: [HttpClient] } }),
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    StatusBar,
    ToastService,
    UserGuard,
    UserState,
    TranslateConfigService,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

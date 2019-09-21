import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EqualValidator } from './lib/helpers/equal-validator';
//import { NgxLoadingModule } from 'ngx-loading';
import { PostDataService } from './lib/services/post-data.service';
import { AuthService } from './lib/services/auth.service';
import { ToastService } from './lib/services/toast.service';
import { GetDataService } from './lib/services/get-data.service';
import { HttpConfigInterceptor } from './lib/interceptor/interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UserGuard } from './lib/route-guards/user.guard';
// import { LocalStorageServie, StorageService } from './lib/services/storage.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './lib/services/translate-config.service';
import { AdminPage } from './admin/admin.page';
import { RegisterAgentPage } from './agent/register-agent/register-agent.page';


export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,
    EqualValidator,
    AdminPage,
    RegisterAgentPage
  ],

  entryComponents: [
    AdminPage,
    RegisterAgentPage
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
//    NgbModule,
    FormsModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (LanguageLoader), deps: [HttpClient] } }),
    ReactiveFormsModule,
    IonicModule.forRoot(),
//    NgxLoadingModule.forRoot({ backdropBackgroundColour: 'transparent', backdropBorderRadius: '4px', primaryColour: '#ffffff', secondaryColour: '#ffffff', tertiaryColour: '#ffffff' }),
    FormsModule,
    AppRoutingModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    StatusBar,
    PostDataService,
    ToastService,
    AuthService,
    UserGuard,
    GetDataService,
    TranslateConfigService,
    // LocalStorageServie,
    // { provide: StorageService, useClass: LocalStorageServie },
    SplashScreen, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

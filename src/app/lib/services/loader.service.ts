import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class LoaderService {

    constructor(public loadingCtrl: LoadingController, private translate: TranslateService,) { }

    showLoader() {
        this.loadingCtrl.create({
            message:  this.translate.instant('loading')
        }).then((loading) => {
            loading.present();

            loading.onDidDismiss().then((dis) => {
                // console.log('dis!');
            });
            this.hideLoader();

        });


    }

    hideLoader() {
        //alert("hide modal");
        this.loadingCtrl.dismiss().catch(() => { });
    }

}
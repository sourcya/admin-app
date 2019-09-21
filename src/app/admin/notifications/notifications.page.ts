import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../services/admin.service';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  data: any = [];
  page = 1;
  message: any;
  thereData = false;

  loading: any;
  dataListPagination = [];
  errorMsg: any;

  response: any;

  constructor(
    private adminServices: AdminService,
    private toast: ToastService,
    public router: Router,
    private translate: TranslateService,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.errorMsg = null;

    this.loading = this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminServices.getNotification(this.page).subscribe(res => {        
        this.response = res;

        let resp: any = res['data'];
        this.data = resp;

        if (this.data.length == 0) {
          this.errorMsg = this.translate.instant('notification-No');
        }
        else {
          //To display the first page  in the beginning and in pagination display the other pages.
          for (let index = 0; index < this.data.length; index++) {
            this.dataListPagination.push(this.data[index]);
          }
        }

        loading.dismiss();

      });

    });
  }



  getAllNotification(page) {
    this.adminServices.getNotification(page).subscribe(res => {
      this.response = res;

      let resp: any = res['data'];
      this.data = resp;

      if (this.data.length == 0) {
        this.errorMsg = this.translate.instant('notification-No');
      }
      else {
        //To display the first page  in the beginning and in pagination display the other pages.
        for (let index = 0; index < this.data.length; index++) {
          this.dataListPagination.push(this.data[index]);
        }
      }
    });
  }


  readNotification(id: number, idTask: number, actionVerb: string) {
    this.loading = this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminServices.readNotification(id, 'notification').subscribe(res => {
        let resp: any = res;
        this.data = resp['data'];
        // console.log(id,idTask,actionVerb);

        this.dataListPagination = [];
        this.adminServices.getNotification(this.page).subscribe(info => {
          this.response = info;

          let resp: any = info['data'];
          this.data = resp;

          if (this.data.length == 0) {
            this.errorMsg = this.translate.instant('notification-No');
          }
          else {
            //To display the first page  in the beginning and in pagination display the other pages.
            for (let index = 0; index < this.data.length; index++) {
              this.dataListPagination.push(this.data[index]);
            }
          }

          loading.dismiss();
          this.toast.show(res['message']);

        });

        // this.router.navigate([`/${actionVerb}/${idTask}/show`])
      })
      // console.log(id)

    });
  }


  readAll() {
    this.loading = this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminServices.readAllNotification('read all notifications').subscribe(res => {
        let resp: any = res;
        this.data = resp['data'];

        this.dataListPagination = [];
        this.adminServices.getNotification(this.page).subscribe(res => {
          this.response = res;

          let resp: any = res['data'];
          this.data = resp;

          if (this.data.length == 0) {
            this.errorMsg = this.translate.instant('notification-No');
          }
          else {
            //To display the first page  in the beginning and in pagination display the other pages.
            for (let index = 0; index < this.data.length; index++) {
              this.dataListPagination.push(this.data[index]);
            }
          }

          loading.dismiss();
          this.toast.show(res['message']);

        });

      },
        (err) => {
          loading.dismiss();

          // if (err.status === 404) {
          //   this.message = err;
          this.toast.show(err.error.message);
          // }
        });
    });
  }


  // //pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      if (this.response) {
        // console.log('Done');
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getAllNotification(this.page);
        }
        event.target.complete();
        // console.log(this.dataListPagination);
        if (this.dataListPagination.length == this.response.meta.total) {
          event.target.disabled = true;
        }
      }
      else {
        event.target.disabled = true;
      }
    }, 500);
  }


  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    // setTimeout(() => {
    // console.log('Async operation has ended');

    this.dataListPagination = [];
    this.page = 1;
    this.errorMsg = null;
    this.adminServices.getNotification(this.page).subscribe(res => {
      this.response = res;

      let resp: any = res['data'];
      this.data = resp;

      if (this.data.length == 0) {
        this.errorMsg = this.translate.instant('notification-No');
        event.target.complete();
      }
      else {
        //To display the first page  in the beginning and in pagination display the other pages.
        for (let index = 0; index < this.data.length; index++) {
          this.dataListPagination.push(this.data[index]);
        }
        event.target.complete();
      }

    });

    // }, 2000);
  }


}

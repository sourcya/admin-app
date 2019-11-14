import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  page = 1;
  message: any;
  thereData = false;

  loading: any;
  dataListPagination = [];
  errorMsg: any;

  response: any;

  constructor(
    private notificationsServices: NotificationsService,
    private toast: ToastService,
    public router: Router,
    private translate: TranslateService ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.errorMsg = null;

     this.getAllNotification(this.page)
  }



  getAllNotification(page) {
    this.notificationsServices.getNotification(page).subscribe(res => {
      this.response = res;

      if (res['data'].length == 0) {
        this.errorMsg = this.translate.instant('notification-No');
      }
      else {
        //To display the first page  in the beginning and in pagination display the other pages.
        for (let index = 0; index < res['data'].length; index++) {
          this.dataListPagination.push(res['data'][index]);
        }
      }
    });
  }


  readNotification(id: number, idTask: number, actionVerb: string) {
      this.notificationsServices.readNotification(id, 'notification').subscribe(res => {
        // console.log(id,idTask,actionVerb);
        this.toast.show(res['message']);

        this.dataListPagination = [];
        this.page = 1;
        this.errorMsg = null;
        this.getAllNotification(this.page);

        // this.router.navigate([`/${actionVerb}/${idTask}/show`])
      })
      // console.log(id)
  }


  readAll() {
      this.notificationsServices.readAllNotification('read all notifications').subscribe(res => {
        this.toast.show(res['message']);

        this.dataListPagination = [];
        this.page = 1;
        this.errorMsg = null;
        this.getAllNotification(this.page);

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

    this.getAllNotification(this.page);

    event.target.complete();

    // }, 2000);
  }


}

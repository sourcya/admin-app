import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonSlides,
  IonContent,
  ModalController,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.page.html',
  styleUrls: ['./agents.page.scss']
})
export class AgentsPage implements OnInit {
  @ViewChild('slider', { static: false }) slider: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  page = '0';

  Pending: any;
  approve: any;
  decline: any;

  data: any;

  agentErrorPending: any;
  agentErrorDecline: any;
  agentErrorApprove: any;

  agent = {
    agents: this.translate.instant('agents'),
    Pending: this.translate.instant('pending'),
    decline: this.translate.instant('decline'),
    approve: this.translate.instant('approve')
  };

  constructor(
    private translate: TranslateService,
    public modalController: ModalController,
    public router: Router,
    private adminService: AdminService,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private toast: ToastService
  ) {
  }

  ngOnInit() {
  }

  selectedTab(index) {
    this.content.scrollToTop();
    this.slider.slideTo(index);
  }

  async moveButton() {
    const index = await this.slider.getActiveIndex();
    this.page = index.toString();
  }
  onActivate() {
    window.scroll(0, 0);
  }

  ionViewWillEnter() {
    this.data = null;

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminService.getAgent().subscribe(res => {
        
        this.data = res['data'];
        this.Pending = this.data.filter(it => it.status === 'Pending');
        this.approve = this.data.filter(it => it.status === 'Approved');
        this.decline = this.data.filter(it => it.status === 'Declined');

        if(this.Pending.length == 0){
          this.agentErrorPending = this.translate.instant('gent-ErrorPending');
        }
        
        if(this.approve.length == 0){
          this.agentErrorApprove = this.translate.instant('gent-ErrorApprove');
        }

        if(this.decline.length == 0){
          this.agentErrorDecline = this.translate.instant('gent-ErrorDecline');
        }

        loading.dismiss();
      }, err => {
        loading.dismiss();

        
      })
    });
  }


  declineAgent(code) {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminService.postAgentDecline(code).subscribe(dec => {

        this.adminService.getAgent().subscribe(res => {
          this.data = res['data'];
          this.Pending = this.data.filter(it => it.status === 'Pending');
          this.approve = this.data.filter(it => it.status === 'Approved');
          this.decline = this.data.filter(it => it.status === 'Declined');

          if(this.Pending.length == 0){
            this.agentErrorPending = this.translate.instant('gent-ErrorPending');
          }
          
          if(this.approve.length == 0){
            this.agentErrorApprove = this.translate.instant('gent-ErrorApprove');
          }
  
          if(this.decline.length == 0){
            this.agentErrorDecline = this.translate.instant('gent-ErrorDecline');
          }

          loading.dismiss();
          this.toast.show(dec['message']);

        }, err => {
          loading.dismiss();
          
        })
      }, errs => {
        loading.dismiss();
        this.toast.show(errs.error.message);
      })
    });
  }


  approveAgent(code){
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      this.adminService.postAgentApprove(code).subscribe(dec => {

        this.adminService.getAgent().subscribe(res => {
          this.data = res['data'];
          this.Pending = this.data.filter(it => it.status === 'Pending');
          this.approve = this.data.filter(it => it.status === 'Approved');
          this.decline = this.data.filter(it => it.status === 'Declined');
          
          if(this.Pending.length == 0){
            this.agentErrorPending = this.translate.instant('gent-ErrorPending');
          }
          
          if(this.approve.length == 0){
            this.agentErrorApprove = this.translate.instant('gent-ErrorApprove');
          }
  
          if(this.decline.length == 0){
            this.agentErrorDecline = this.translate.instant('gent-ErrorDecline');
          }

          loading.dismiss();
          this.toast.show(dec['message']);

        }, err => {
          loading.dismiss();
          
        })
      }, errs => {
        loading.dismiss();
        this.toast.show(errs.error.message);
      })
    });
  }


  async deleteAgent() {
    const alert = await this.alertController.create({
      header: this.translate.instant('confirm'),
      message: this.translate.instant('sure-to-delete'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => { }
        },
        {
          text: this.translate.instant('ok'),
          handler: () => { }
        }
      ]
    });
    await alert.present();
  }


  editAgent() {
    this.router.navigateByUrl('/admin/attributes');
  }


}

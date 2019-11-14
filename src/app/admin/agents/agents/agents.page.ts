import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonContent, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/lib/services/toast.service';
import { AgentsService } from '../services/agents.service';

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

  data = [];

  agentErrorPending: any;
  agentErrorDecline: any;
  agentErrorApprove: any;

  agent = {
    agents: this.translate.instant('agents'),
    Pending: this.translate.instant('pending'),
    decline: this.translate.instant('decline'),
    approve: this.translate.instant('approve')
  };

  response: any;
  pageNum = 1;

  constructor(
    private translate: TranslateService,
    public modalController: ModalController,
    public router: Router,
    private agentsServices: AgentsService,
    public alertController: AlertController,
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
    this.agentErrorPending = null;
    this.agentErrorDecline = null;
    this.agentErrorApprove = null;

    this.Pending = null;
    this.decline = null;
    this.approve = null;

    this.data = [];
    this.pageNum = 1;

    this.getAllAgent(this.pageNum);
  }

  getAllAgent(pageApi) {
    this.agentsServices.getAgent(pageApi).subscribe(res => {
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.data.push(res['data'][index]);
      }

      this.data = res['data'];
      this.Pending = this.data.filter(it => it.status === 'Pending');
      this.approve = this.data.filter(it => it.status === 'Approved');
      this.decline = this.data.filter(it => it.status === 'Declined');

      if (this.Pending.length == 0) {
        this.agentErrorPending = this.translate.instant('gent-ErrorPending');
      }

      if (this.approve.length == 0) {
        this.agentErrorApprove = this.translate.instant('gent-ErrorApprove');
      }

      if (this.decline.length == 0) {
        this.agentErrorDecline = this.translate.instant('gent-ErrorDecline');
      }

    });
  }


  declineAgent(code) {
    this.agentsServices.postAgentDecline(code).subscribe(dec => {
      this.toast.show(dec['message']);

      this.data = [];
      this.pageNum = 1;
      this.getAllAgent(this.pageNum);

    });
  }


  approveAgent(code) {
    this.agentsServices.postAgentApprove(code).subscribe(appr => {
      this.toast.show(appr['message']);

      this.data = [];
      this.pageNum = 1;
      this.getAllAgent(this.pageNum);

    });
  }


  ////pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.pageNum) {
          this.pageNum++;
          // console.log("NumPages : ", this.pageNum);
          this.getAllAgent(this.pageNum);
        }
        event.target.complete();
        // console.log(this.dataListPagination);
        if (this.data.length == this.response.meta.total) {
          event.target.disabled = true;
        }
      }
      else {
        event.target.disabled = true;
      }

    }, 500);
  }


  ionRefresh(event) {
    this.agentErrorPending = null;
    this.agentErrorDecline = null;
    this.agentErrorApprove = null;

    this.Pending = null;
    this.decline = null;
    this.approve = null;

    this.data = [];
    this.pageNum = 1;

    this.getAllAgent(this.pageNum);
    event.target.complete();

  }


}

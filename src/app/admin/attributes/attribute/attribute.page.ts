import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributesService } from '../services/attributes.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.page.html',
  styleUrls: ['./attribute.page.scss'],
})
export class AttributePage implements OnInit {
  keys = [];

  num: number = 1;
  keyNumbers = [this.num];

  showDataKeys = [];

  dataShow = {
    name: this.translate.instant("name"),
    type: this.translate.instant("type"),
    assigned_for: this.translate.instant("assigned_for"),
    is_required: this.translate.instant("is_required"),
    keys: this.translate.instant("keys"),
  }


  type = [
    {
      name: "input",
    },
    {
      name: "selectable",
    },
    {
      name: "default",
    }
  ];


  assigned_for = [
    {
      name: this.translate.instant("agent"),
    }
  ];


  is_required =
    {
      yes: this.translate.instant("yes"),

      no: this.translate.instant("no"),
    };

  attributeId: any;
  data: any;
  checkedValue: any;

  constructor(private translate: TranslateService,
    private attributesService: AttributesService,
    private toast: ToastService, private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("id"));
      if (params.get("id")) {
        this.attributeId = params.get("id");
        // console.log(this.attributeId);
      }
    });
  }

  addKeys() {
    this.showDataKeys.length = 0;
    this.keyNumbers.push(this.num++);
    console.log(this.keyNumbers.length);
  }

  changeInput() {
    this.showDataKeys.length = 0;
  }

  ionViewWillEnter() {

    this.data = null;
    this.showDataKeys = [];

      this.attributesService.getAtrributeId(this.attributeId).subscribe(res => {
        this.data = res["data"];
        this.num = this.data.keys.length;
        if (res['data'].is_required == 1) {
          this.checkedValue = 1 + '';
        } else {
          this.checkedValue = 0 + '';
        }
        // console.log(this.data);
        for (let index = 0; index < res['data'].keys.length; index++) {
          this.showDataKeys.push(res['data'].keys[index]);
        }
        // console.log(this.showDataKeys.length);
    });
  }


  edit(attribute) {
      if(this.keys.length == 0){
        this.keys = this.showDataKeys;
      }
      // console.log("keys", this.keys);
      let data: any = {
        assigned_for: attribute.value.assigned_for,
        name: attribute.value.name,
        is_required: attribute.value.is_required,
        type: attribute.value.type,
        keys: this.keys,
      };

      this.attributesService.updateAtrributeId(this.attributeId, data).subscribe(res => {
        this.toast.show(res['message']);
        this.router.navigate(['/admin/attributes'])
    });

  }

  deleteAttribute() {
    this.alertCtrl.create({
      message: this.translate.instant('attribute-message'),
      buttons: [
        {
          text: this.translate.instant('cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant('delete'),
          handler: () => {

            // console.log('Confirm Okay');

              this.attributesService.deleteAtrributeId(this.attributeId).subscribe(res => {
                this.toast.show(res['message']);
                this.router.navigate(['/admin/attributes'])
            });
            
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }


}

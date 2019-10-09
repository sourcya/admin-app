import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/lib/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributesService } from '../services/attributes.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.page.html',
  styleUrls: ['./attribute.page.scss'],
})
export class AttributePage implements OnInit {
  keys=[];

  num: number = 1;
  keyNumbers = [this.num];

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

  constructor(private translate: TranslateService,
    private attributesService: AttributesService,
    private loadingController: LoadingController,
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
    this.keyNumbers.push(this.num++);
    console.log(this.keyNumbers.length);
  }

  ionViewWillEnter() {

    this.data = null;

    this.loadingController.create({
      message: this.translate.instant("loading")
    }).then(loading => {
        loading.present();
        this.attributesService.getAtrributeId(this.attributeId).subscribe(res => {
          this.data = res["data"];
          this.num = this.data.keys.length;
          console.log(this.data);
          loading.dismiss();
        },
          err => {
            loading.dismiss();
            if (err.status === 404) {
              // this.data.length = 0
            }
          }
        );
      });
  }


  edit(attribute) {
    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();

      console.log("keys",this.keys);
      

      let data :any = {
        assigned_for: attribute.value.assigned_for,
        name: attribute.value.name,
        is_required: attribute.value.is_required,
        type: attribute.value.type,
        keys: this.keys,
      };

      this.attributesService.updateAtrributeId(this.attributeId, data).subscribe(res => {
        loading.dismiss();

        this.toast.show(res['message']);
      }, err => {
        loading.dismiss();

        this.toast.show(err.error.message)
      })
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

            this.loadingController.create({
              message: this.translate.instant('loading')
            }).then((loading) => {
              loading.present();

              this.attributesService.deleteAtrributeId(this.attributeId).subscribe(res => {
                loading.dismiss();
                this.toast.show(res['message']);
                this.router.navigate(['/admin/attributes'])
              },
                (err) => {
                  loading.dismiss();
                  this.toast.show(err.error.message)
                }
              );
            });
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }


}

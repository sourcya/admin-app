import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../services/admin.service';
import { ToastService } from 'src/app/lib/services/toast.service';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-attributes',
  templateUrl: './add-attributes.page.html',
  styleUrls: ['./add-attributes.page.scss'],
})
export class AddAttributesPage implements OnInit {

  @ViewChild('createAttributes', { static: false }) createAttributes: NgForm;

  model: any = {};

  dataShow = {
    name: this.translate.instant("name"),
    type: this.translate.instant("type"),
    assigned_for: this.translate.instant("assigned_for"),
    is_required: this.translate.instant("is_required"),
    keys: this.translate.instant("keys"),
  }

  type = [
    {
      name: this.translate.instant("input"),
    },
    {
      name: this.translate.instant("selectable"),
    },
    {
      name: this.translate.instant("default"),
    }
  ];


  assigned_for = [
    {
      name: this.translate.instant("agent"),
    },
    {
      name: this.translate.instant("user"),
    },
    {
      name: this.translate.instant("admin"),
    }
  ];


  is_required =
    {
      yes: this.translate.instant("yes"),

      no: this.translate.instant("no"),
    };

  num: number = 1;
  keyNumbers = [this.num];

  keys=[];

  constructor(private translate: TranslateService,
    private adminService: AdminService,
    private tosat: ToastService, private router: Router,
    public modalController: ModalController,
    private loadingController: LoadingController, ) { }

  ngOnInit() {
  }

  addKeys() {
    this.keyNumbers.push(this.num++);
    console.log(this.keyNumbers.length);
    // console.log(this.keys);
    

  }


  addAttributes() {
    // console.log(this.createAttributes.value);

    this.loadingController.create({
      message: this.translate.instant('loading')
    }).then((loading) => {
      loading.present();


    console.log(this.createAttributes.value);

    let data :any = {
      assigned_for: this.createAttributes.value.assigned_for,
      name: this.createAttributes.value.name,
      is_required: this.createAttributes.value.is_required,
      type: this.createAttributes.value.type,
      keys: this.keys,
    };

      this.adminService.postAttributes(data).subscribe(res => {
        loading.dismiss();
        this.tosat.show(res['message']);

        this.cancel();
        this.router.navigate(['/admin/attributes']);

      }, err => {
        loading.dismiss();
        this.tosat.show(err.error.message)
      })
    });
  }

  cancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

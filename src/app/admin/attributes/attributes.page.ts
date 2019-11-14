import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddAttributesPage } from './add-attributes/add-attributes.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AttributesService } from './services/attributes.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  page = 1;
  attributesError: any;
  dataListPagination = [];

  response: any;

  dataShow = {
    assigned_for: this.translate.instant("assigned_for"),
    type: this.translate.instant("type"),
    attribute: this.translate.instant("attribute"),
  }

  
  constructor(private translate: TranslateService,
    private attributesService: AttributesService, public router: Router,
    public modalController: ModalController, ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.dataListPagination = [];
    this.page = 1;
    this.attributesError = null;

     this.getPosts(this.page);
  }


  addAttributes(){
    this.modalController.create({
      component: AddAttributesPage
    }).then((modal) => {
      modal.present();
    });
  }

  getPosts(page) {
    this.attributesService.getAllAttributes(page).subscribe(res => {
      this.response = res;

      for (let index = 0; index < res['data'].length; index++) {
        this.dataListPagination.push(res['data'][index]);
      }

    });
  }


  ////pagination
  loadDataPagination(event) {
    // console.log(this.dataListPagination);
    setTimeout(() => {
      // console.log('Done');
      if (this.response) {
        if (this.response.meta.last_page > this.page) {
          this.page++;
          // console.log("NumPages : ", this.page);
          this.getPosts(this.page);
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


  openDetail(id: number) {
    this.router.navigateByUrl('admin/attribute/' + id);
  }


  ionRefresh(event) {
    // console.log('Pull Event Triggered!');
    this.dataListPagination = [];
    this.page = 1;
    this.attributesError = null;
   
    this.getPosts(this.page);

    event.target.complete();
    
  }

  

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.page.html',
  styleUrls: ['./edit-role.page.scss'],
})
export class EditRolePage implements OnInit {
  role ={
    edit:this.translate.instant('edit'),
    selectPermission:this.translate.instant('select-permissions'),
    ok:this.translate.instant('ok'),
    selectRoles: this.translate.instant('select-roles'),
    title:this.translate.instant('title'),
    cancel:this.translate.instant('cancel'),
    save:this.translate.instant('save')
  }
  dataMember=[];
  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }
  selectOpt(select){
    this.dataMember.push(select.value);
    console.log(select.value)
  }
}
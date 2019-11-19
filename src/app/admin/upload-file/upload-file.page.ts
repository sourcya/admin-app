import { Component, OnInit } from '@angular/core';
import { FilesService } from './services/files.service';
import { ToastService } from 'src/app/lib/services/toast.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.page.html',
  styleUrls: ['./upload-file.page.scss'],
})
export class UploadFilePage implements OnInit {

  fileData: File = null;

  constructor(private fileservice: FilesService, private toast: ToastService) { }

  ngOnInit() {
  }

  fileProgress(event) {
    this.fileData = <File>event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar_image', this.fileData);

    this.fileservice.uploadFile(formData).subscribe(res => {
      this.toast.show(res['message']);
    });
  }


}

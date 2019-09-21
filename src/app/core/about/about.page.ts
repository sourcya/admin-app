import { Component, OnInit } from '@angular/core';
import { About } from './about.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  about: About[] = [
    {
      title: 'Privacy Policy',
      linkUrl:
        '/privacy',

    },
    {
      title: 'Terms of services',
      linkUrl:
        '/tos',
    }
  ];

  constructor(public router: Router) { }

  ngOnInit() {}

  openUrl(link){
    this.router.navigateByUrl(link);

    // window.open(link,"", "width=200,height=100");
  }

}

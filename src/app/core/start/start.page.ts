import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
link=environment.PrivacyTermsLinkUrl;
  constructor(public router: Router) { }

  ngOnInit() {}

  register() {
    this.router.navigateByUrl('/register');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  openPrivacy(){
    this.router.navigateByUrl('/about');
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      private router: Router,
      public afAuth: AngularFireAuth,
      iconRegistry: MdIconRegistry,
      sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/social/facebook.svg')
    );
    iconRegistry.addSvgIcon(
        'twitter',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/social/twitter.svg')
    );
    iconRegistry.addSvgIcon(
        'google-plus',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/social/google-plus.svg')
    );
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  login(provider) {
    switch (provider) {
      case 'google' : this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'facebook' : this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        break;
      case 'twitter' : this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        break;
      default: return false;
    }

    this.router.navigate(['/']);
  }
}

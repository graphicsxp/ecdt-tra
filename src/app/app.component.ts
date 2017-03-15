import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Auth, User } from '@ionic/cloud-angular';
import { AppVersion } from 'ionic-native';

import { LoginComponent } from '../pages/login/login.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginComponent;

  pages: Array<{ title: string, component: any }>;
  username: string;
  app: any = {
    name: '',
    versionCode: '',
    versionNumber: '',
    packageName: ''
  };

  constructor(public platform: Platform, private _auth: Auth, public _user: User, private _alertController: AlertController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.username = this._user.details.username;

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      AppVersion.getAppName().then(v => this.app['name'] = v);
      AppVersion.getVersionCode().then(v => this.app['versionCode'] = v);
      AppVersion.getVersionNumber().then(v => this.app['versionNumber'] = v);
      AppVersion.getPackageName().then(v => this.app['packageName'] = v);

      StatusBar.styleDefault();
      if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
        }, 100);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {

    let confirm = this._alertController.create({
      title: 'Confirm',
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this._auth.logout();
            this.nav.setRoot(LoginComponent);
          }
        }
      ]
    });
    confirm.present();
  }
}

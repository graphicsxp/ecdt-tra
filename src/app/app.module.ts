import { SignupModule } from './../pages/signup/signup.module';
import { LoginModule } from './../pages/login/login.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '086cd9b3'
  }
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    LoginModule,
    SignupModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

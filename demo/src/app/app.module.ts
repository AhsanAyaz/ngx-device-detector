import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { KeysPipe } from './pipes/keys.pipe';
import { CommonModule } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

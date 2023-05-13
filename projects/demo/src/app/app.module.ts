import { APP_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { KeysPipe } from './pipes/keys.pipe';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, KeysPipe],
  imports: [NoopAnimationsModule, CommonModule],
  providers: [{
    provide: APP_ID,
    useValue: 'serverApp'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

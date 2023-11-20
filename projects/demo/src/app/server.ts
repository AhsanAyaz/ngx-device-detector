import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '../express.tokens';
import { Request } from 'express';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class UniversalDeviceDetectorService extends DeviceDetectorService {
  constructor(@Inject(PLATFORM_ID) platformId: any, @Optional() @Inject(REQUEST) request: Request) {
    super(platformId);
    if (isPlatformServer(platformId)) {
      super.setDeviceInfo((request.headers['user-agent'] as string) || '');
    }
  }
}

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService,
    },
  ],
})
export class AppServerModule {}


import { NgModule } from '@angular/core';

// import {DIRECTIVES} from './directives';
// import {PIPES} from './pipes';
import {PROVIDERS} from './services';

// export * from './directives';
export * from './services';
// export * from './pipes';


@NgModule({
  declarations: [

  ],
  imports: [

  ],
  // directives: [DIRECTIVES],
  // pipes: [PIPES],
  providers:[
    PROVIDERS
  ]
})
export class Ng2DeviceDetector {

}
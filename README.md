# ng2-device-detector


> An Angular 2 powered device detector that helps to identify browser, os and other useful information using user-agent using TypeScript (and ofcourse the compiled JS).


## Device service
Holds the following properties
* browser
* os
* device
* userAgent
* os_version

## Installation

To install this library, run:

```bash
$ npm install ng2-device-detector --save
```

## Usage
In your app.module.ts
```bash
import { NgModule } from '@angular/core';
import {Ng2DeviceDetector} from '<path-to-node_modules>/ng2-device-detector';
...
@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2DeviceDetector
  ],
  providers:[
    AuthService
  ]
  ...
})
```

In your component where you want to use the Device Service
```bash
import { Component } from '@angular/core';
...
import {Device} from '<path-to-node_modules>/ng2-device-detector/services/ng2-device.service';
...
@Component({
  selector: 'home',  // <home></home>
  providers: [
    ...
    Device,
    ...
  ],
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html',
  ...
})

export class HomeComponent {
  ...
  constructor(..., private http: Http, private device: Device) {
    this.epicFunction();
  }
  ...
  epicFunction() {
    console.log('hello `Home` component');
    console.log(this.device);
  }
  ...
}

```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## Credits

The library is inspired by and based on the work from [ng-device-detector ](https://github.com/srfrnk/ng-device-detector). Also used a typescript wrapper of the amazing work in [ReTree](https://github.com/srfrnk/re-tree) for regex based needs and an Angular2 Library Creator boilerplate to get the work started fast. I.e. [Generator Angular2 library](https://github.com/jvandemo/generator-angular2-library).

## License

MIT © [Ahsan Ayaz](ahsan.ubitian@gmail.com)
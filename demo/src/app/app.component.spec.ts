import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { KeysPipe } from './pipes/keys.pipe';

describe('AppComponent', () => {

  let fixture, app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        Ng2DeviceDetectorModule.forRoot()
      ],
      declarations: [
        AppComponent,
        KeysPipe
      ],
      providers: []
    }).compileComponents();
  }));

   beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'ng2-dd works!'`, async(() => {
    expect(app.device).toBeTruthy();
  }));

  it('should render demo heading in an element having class demo-heading-text', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.demo-heading-text').textContent).toContain('ng2-device-detector demo');
  }));

  it('should render device information inside table in <tr> tags ', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('table tr.info-item').length).toEqual(6);  // all the 6 required properties
  }));
});

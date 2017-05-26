"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var app_component_1 = require("./app.component");
var ng2_device_detector_1 = require("ng2-device-detector");
var keys_pipe_1 = require("./pipes/keys.pipe");
describe('AppComponent', function () {
    var fixture, app;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                ng2_device_detector_1.Ng2DeviceDetectorModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                keys_pipe_1.KeysPipe
            ],
            providers: []
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });
    it('should create the app', testing_1.async(function () {
        expect(app).toBeTruthy();
    }));
    it("should have as title 'ng2-dd works!'", testing_1.async(function () {
        expect(app.device).toBeTruthy();
    }));
    it('should render demo heading in an element having class demo-heading-text', testing_1.async(function () {
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.demo-heading-text').textContent).toContain('ng2-device-detector demo');
    }));
    it('should render device information inside table in <tr> tags ', testing_1.async(function () {
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('table tr.info-item').length).toEqual(6); // all the 6 required properties
    }));
});

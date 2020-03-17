import * as tslib_1 from "tslib";
var DeviceDetectorModule_1;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from './device-detector.service';
let DeviceDetectorModule = DeviceDetectorModule_1 = class DeviceDetectorModule {
    static forRoot() {
        return {
            ngModule: DeviceDetectorModule_1,
            providers: [DeviceDetectorService]
        };
    }
};
DeviceDetectorModule = DeviceDetectorModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule
        ]
    })
], DeviceDetectorModule);
export { DeviceDetectorModule };
export { DeviceDetectorService } from './device-detector.service';
export { ReTree } from './retree';
export * from './device-detector.constants';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGV2aWNlLWRldGVjdG9yLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPbEUsSUFBYSxvQkFBb0IsNEJBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDbkMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBUFksb0JBQW9CO0lBTGhDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7U0FDYjtLQUNGLENBQUM7R0FDVyxvQkFBb0IsQ0FPaEM7U0FQWSxvQkFBb0I7QUFTakMsT0FBTyxFQUFFLHFCQUFxQixFQUFjLE1BQU0sMkJBQTJCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxjQUFjLDZCQUE2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZXZpY2VEZXRlY3RvclNlcnZpY2UgfSBmcm9tICcuL2RldmljZS1kZXRlY3Rvci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERldmljZURldGVjdG9yTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEZXZpY2VEZXRlY3Rvck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0RldmljZURldGVjdG9yU2VydmljZV1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IERldmljZURldGVjdG9yU2VydmljZSwgRGV2aWNlSW5mbyB9IGZyb20gJy4vZGV2aWNlLWRldGVjdG9yLnNlcnZpY2UnO1xuZXhwb3J0IHsgUmVUcmVlIH0gZnJvbSAnLi9yZXRyZWUnO1xuZXhwb3J0ICogZnJvbSAnLi9kZXZpY2UtZGV0ZWN0b3IuY29uc3RhbnRzJztcblxuIl19
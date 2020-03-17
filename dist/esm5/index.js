import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from './device-detector.service';
var DeviceDetectorModule = /** @class */ (function () {
    function DeviceDetectorModule() {
    }
    DeviceDetectorModule_1 = DeviceDetectorModule;
    DeviceDetectorModule.forRoot = function () {
        return {
            ngModule: DeviceDetectorModule_1,
            providers: [DeviceDetectorService]
        };
    };
    var DeviceDetectorModule_1;
    DeviceDetectorModule = DeviceDetectorModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ]
        })
    ], DeviceDetectorModule);
    return DeviceDetectorModule;
}());
export { DeviceDetectorModule };
export { DeviceDetectorService } from './device-detector.service';
export { ReTree } from './retree';
export * from './device-detector.constants';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGV2aWNlLWRldGVjdG9yLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU9sRTtJQUFBO0lBT0EsQ0FBQzs2QkFQWSxvQkFBb0I7SUFDeEIsNEJBQU8sR0FBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDOztJQU5VLG9CQUFvQjtRQUxoQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTthQUNiO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQU9oQztJQUFELDJCQUFDO0NBQUEsQUFQRCxJQU9DO1NBUFksb0JBQW9CO0FBU2pDLE9BQU8sRUFBRSxxQkFBcUIsRUFBYyxNQUFNLDJCQUEyQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsY0FBYyw2QkFBNkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGV2aWNlRGV0ZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9kZXZpY2UtZGV0ZWN0b3Iuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZXZpY2VEZXRlY3Rvck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRGV2aWNlRGV0ZWN0b3JNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtEZXZpY2VEZXRlY3RvclNlcnZpY2VdXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBEZXZpY2VEZXRlY3RvclNlcnZpY2UsIERldmljZUluZm8gfSBmcm9tICcuL2RldmljZS1kZXRlY3Rvci5zZXJ2aWNlJztcbmV4cG9ydCB7IFJlVHJlZSB9IGZyb20gJy4vcmV0cmVlJztcbmV4cG9ydCAqIGZyb20gJy4vZGV2aWNlLWRldGVjdG9yLmNvbnN0YW50cyc7XG5cbiJdfQ==
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { APP_ID, importProvidersFrom } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule),
        {
            provide: APP_ID,
            useValue: 'serverApp'
        },
        provideNoopAnimations(),
    ]
})
    .catch(err => console.error(err));
});

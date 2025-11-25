import { APP_ID, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(CommonModule),
        {
            provide: APP_ID,
            useValue: 'serverApp'
        },
    ]
})
    .catch(err => console.error(err));
});

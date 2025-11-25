import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering(), provideZonelessChangeDetection()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

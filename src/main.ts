import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';
import { apiKeyInterceptor } from '@interceptors/api-key.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptors([apiKeyInterceptor]))
  ]
}).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

// Agregamos los proveedores necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),          
    provideHttpClient(),           
    importProvidersFrom(FormsModule),       
  ]
})
.catch((err) => console.error(err));

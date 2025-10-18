import { enableProdMode, NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    console.log('✅ Angular inicializado correctamente');

    const ngZone = appRef.injector.get(NgZone);
    ngZone.run(() => {
      
    });
  })
  .catch(err => console.error('❌ Error al iniciar Angular:', err));

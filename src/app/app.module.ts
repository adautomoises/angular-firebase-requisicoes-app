import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/public/login/login.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/admin/menu/menu.component';
import { ComumModule } from './modules/comum/comum.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ComumModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

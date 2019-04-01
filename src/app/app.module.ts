import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AlertsModule } from 'angular-alert-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainAgeSelectorComponent } from './main-age-selector/main-age-selector.component';
import { DataService } from './data.service';
import { HeaderOnPageComponent } from './header-on-page/header-on-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainAgeSelectorComponent,
    HeaderOnPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxLocalStorageModule.forRoot(),
    AlertsModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }

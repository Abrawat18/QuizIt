import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule, MatSelectModule, MatCardModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxLocalStorageModule } from 'ngx-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainAgeSelectorComponent } from './main-age-selector/main-age-selector.component';
import { DataService } from './data.service';
import { HeaderOnPageComponent } from './header-on-page/header-on-page.component';
import {QuizPageComponent} from './quiz-page/quiz-page.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainAgeSelectorComponent,
    HeaderOnPageComponent,
    QuizPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxLocalStorageModule.forRoot(),
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { MatGridListModule, MatSelectModule, MatCardModule, MatInputModule,MatButtonModule,MatListModule,MatDialogModule } from '@angular/material';
=======
import { MatGridListModule, MatSelectModule, MatCardModule, MatInputModule } from '@angular/material';
>>>>>>> e9e35829d2ce7f09f13915d27d02c74c6f209fb3
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxLocalStorageModule } from 'ngx-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainAgeSelectorComponent } from './main-age-selector/main-age-selector.component';
import { DataService } from './data.service';
import { HeaderOnPageComponent } from './header-on-page/header-on-page.component';
import {QuizPageComponent} from './quiz-page/quiz-page.component';
import { ResultPageComponent } from './result-page/result-page.component';


import { HttpClientModule } from '@angular/common/http';
import { ChildQuizPageComponent } from './child-quiz-page/child-quiz-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainAgeSelectorComponent,
    HeaderOnPageComponent,
<<<<<<< HEAD
    QuizPageComponent,
    ResultPageComponent,
    ChildQuizPageComponent
=======
    QuizPageComponent
>>>>>>> e9e35829d2ce7f09f13915d27d02c74c6f209fb3
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
<<<<<<< HEAD
    MatListModule,
    MatDialogModule,
    MatButtonModule,
=======
>>>>>>> e9e35829d2ce7f09f13915d27d02c74c6f209fb3
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }

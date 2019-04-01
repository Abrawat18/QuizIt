import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule, MatSelectModule,MatCardModule,MatInputModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainAgeSelectorComponent } from './main-age-selector/main-age-selector.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainAgeSelectorComponent,
    QuizPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

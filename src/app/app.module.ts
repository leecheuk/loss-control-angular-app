// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'; 
import { QuestionaireRoutingModule } from './views/questionaire/questionaire-routing.module';

// Store
import { StoreModule } from '@ngrx/store';
import { questionsReducer } from './store/reducers/questions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from './store/effects/questions.effect';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuestionComponent } from './components/question/question.component';
import { ButtonComponent } from './components/button/button.component';
import { ProgressComponent } from './components/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    // Router
    AppRoutingModule,
    // Animations
    BrowserAnimationsModule,
    // Store
    StoreModule.forRoot({
      questions: questionsReducer
    }),
    EffectsModule.forRoot([
      QuestionsEffects
    ]),
    // Shared
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

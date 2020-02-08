// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'; 

// Store
import { StoreModule } from '@ngrx/store';
import { questionsReducer } from './store/reducers/questions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from './store/effects/questions.effect';

// Directives
import { LoadDirective } from './shared/load.directive';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoadDirective
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

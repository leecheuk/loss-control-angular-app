import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './views/home/home.component';
import {QuestionaireComponent} from './views/questionaire/questionaire.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questionaire', component: QuestionaireComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

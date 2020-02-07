import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './views/home/home.component';


const routes: Routes = [
  { path: 'questionaire', 
    loadChildren: () => import('./views/questionaire/questionaire.module')
                    .then(m => m.QuestionaireModule)
  },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

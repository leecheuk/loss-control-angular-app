import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionaireComponent } from './questionaire.component';

const routes: Routes = [
    { path: '', component: QuestionaireComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class QuestionaireRoutingModule {}
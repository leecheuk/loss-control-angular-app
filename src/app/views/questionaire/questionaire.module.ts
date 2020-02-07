import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionaireRoutingModule } from './questionaire-routing.module';

import { QuestionaireComponent } from './questionaire.component';
import { QuestionComponent } from 'src/app/components/question/question.component';
import { ProgressComponent } from 'src/app/components/progress/progress.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        QuestionaireRoutingModule,
        SharedModule
    ],
    declarations: [
        QuestionaireComponent,
        QuestionComponent,
        ProgressComponent
    ]
})

export class QuestionaireModule {}

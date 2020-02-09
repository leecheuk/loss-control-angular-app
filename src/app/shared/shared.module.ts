import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
// Components
import { LayoutComponent } from '../components/layout/layout.component';
import { ButtonComponent } from '../components/button/button.component';
import { CommonModule } from '@angular/common';
import { NavbtnComponent } from '../components/navbtn/navbtn.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        HttpClientModule
    ],
    declarations: [
        ButtonComponent,
        LayoutComponent,
        NavbtnComponent
    ],
    exports: [
        ButtonComponent,
        LayoutComponent,
        NavbtnComponent
    ]
})

export class SharedModule {}
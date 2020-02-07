import { NgModule } from '@angular/core';
// Components
import { LayoutComponent } from '../components/layout/layout.component';
import { ButtonComponent } from '../components/button/button.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonComponent,
        LayoutComponent
    ],
    exports: [
        ButtonComponent,
        LayoutComponent
    ]
})

export class SharedModule {}
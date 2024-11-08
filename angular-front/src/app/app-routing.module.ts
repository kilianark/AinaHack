import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { TraductorTextComponent } from "./pages/traductor-text/traductor-text.component";

export const routes: Routes = [
    {path: 'translate_text', component: TraductorTextComponent},
    {path: '', redirectTo: '/translate_text', pathMatch: 'full'},
    {path: '**', redirectTo: '/translate_text', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        TraductorTextComponent,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
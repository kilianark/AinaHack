import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { TraductorTextComponent } from "./pages/traductor-text/traductor-text.component";

export const routes: Routes = [
    {path: 'translate_text', component: TraductorTextComponent},
    {path: '', redirectTo: '/translate_text', pathMatch: 'full'},
    {path: '**', redirectTo: '/translate_text', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        TraductorTextComponent
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
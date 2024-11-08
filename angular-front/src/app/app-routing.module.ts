import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { TraductorTextComponent } from "./pages/traductor-text/traductor-text.component";
import { TraductorDocComponent } from "./pages/traductor-doc/traductor-doc.component";

export const routes: Routes = [
    {path: 'translate_text', component: TraductorTextComponent},
    {path: 'translate_pdf', component: TraductorDocComponent},
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
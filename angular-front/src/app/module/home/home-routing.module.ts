import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "../../pages/home/home.component";
import { TraductorDocComponent } from "../../pages/home/components/traductor-doc/traductor-doc.component";
import { TraductorTextComponent } from "../../pages/home/components/traductor-text/traductor-text.component";


const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'traductor-doc',
        component: TraductorDocComponent
    },
    {
        path: 'traductor-text',
        component: TraductorTextComponent
    }
]
@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutes{}
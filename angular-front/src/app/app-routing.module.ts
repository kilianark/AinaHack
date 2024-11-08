import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeModule } from "./module/home/home.module";

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./module/home/home.module').then((m) => m.HomeModule),
    },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HomeModule
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
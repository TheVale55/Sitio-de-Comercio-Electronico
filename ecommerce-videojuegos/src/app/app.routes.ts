import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './games/pages/layout-page/layout-page.component';
export const routes: Routes = [
    {
        path: 'auth',
        children:[

        ]
    },
    {
        path: 'games',
        component: LayoutPageComponent,
        children: [
    
        ]
    },
    {
        path: '404',
        component: Error404PageComponent
    },
    {
        path: '',
        redirectTo: 'games',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './games/pages/layout-page/layout-page.component';
import { GameListComponent } from './games/pages/game-list/game-list.component';
import { GamePageComponent } from './games/pages/game-page/game-page.component';
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
            { path: 'list', component: GameListComponent },
            { path: ':id', component: GamePageComponent  },
            { path: '**', redirectTo: 'list' }
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

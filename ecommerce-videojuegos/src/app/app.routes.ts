import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './games/pages/layout-page/layout-page.component';
import { GameListComponent } from './games/pages/game-list/game-list.component';
import { GamePageComponent } from './games/pages/game-page/game-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { LandPageComponent } from './shared/pages/land-page/land-page.component';
export const routes: Routes = [
    {
        path: 'auth',
        children: []
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
        path: 'login', // Mover esta ruta antes de los comodines
        component: LoginPageComponent
    },
    {
        path: '404',
        component: Error404PageComponent
    },
    {
        path: '',
        component: LandPageComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
];


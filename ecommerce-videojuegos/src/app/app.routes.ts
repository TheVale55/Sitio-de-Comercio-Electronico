import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './games/pages/layout-page/layout-page.component';
import { GameListComponent } from './games/pages/game-list/game-list.component';
import { GamePageComponent } from './games/pages/game-page/game-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { LandPageComponent } from './shared/pages/land-page/land-page.component';
import { ShoppingCartComponent } from './games/pages/shopping-cart/shopping-cart.component';
import { GameEditComponent } from './games/pages/game-edit/game-edit.component';
import { WishilistComponent } from './games/pages/wishilist/wishilist.component';


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
            { path: 'cart', component: ShoppingCartComponent},
            { path: 'wishlist', component: WishilistComponent},
            { path: ':id', component: GamePageComponent  },
            { path: '**', redirectTo: 'list' },
       
        ]
    },
    { path: 'admin/edit-game/:id', 
      component: GameEditComponent 
    },
    {
        path: 'login', // Mover esta ruta antes de los comodines
        component: LoginPageComponent
    },
    {
        path: 'register', // Mover esta ruta antes de los comodines
        component: RegisterPageComponent
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


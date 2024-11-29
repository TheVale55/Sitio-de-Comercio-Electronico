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
import { GameAddComponent } from './games/pages/game-add/game-add.component';
import { DashboardComponent } from './games/pages/dashboard/dashboard.component';
import { UserProfileComponent } from './auth/pages/user-profile/user-profile.component';
import { OrdersComponent } from './games/pages/orders-page/orders-page.component';
import { UsersPageComponent } from './games/pages/users-page/users-page.component';


export const routes: Routes = [
    {
        path: 'auth',
        children: []
    },
    {
        path: 'games',
        component: LayoutPageComponent,
        children: [
          { path: 'list', component: GameListComponent }, // Lista de juegos
          { path: 'cart', component: ShoppingCartComponent }, // Carrito de compras
          { path: 'wishlist', component: WishilistComponent }, // Lista de deseos
          { path: 'add-game', component: GameAddComponent }, // Añadir juegos
          { path: 'user-profile/:id', component: UserProfileComponent }, // Perfil del usuario
          { path: 'edit-game/:id', component: GameEditComponent }, // Editar juegos
          { path: 'dashboard', component: DashboardComponent }, // Dashboard con navbar
          { path: 'orders', component: OrdersComponent }, // Pedidos
          { path: 'users', component: UsersPageComponent }, // Lista de usuarios
          { path: ':id', component: GamePageComponent }, // Detalle del juego
          { path: '**', redirectTo: 'list' } // Redirección a lista si no se encuentra la ruta
        ]
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


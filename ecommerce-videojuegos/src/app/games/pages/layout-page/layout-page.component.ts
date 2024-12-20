import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  isLoggedIn: boolean = false; // Estado del usuario logueado
  isDropdownOpen: boolean = false;
  isAdmin: boolean = false; // Bandera para determinar si el usuario es administrador
  userName: string = ''; // Nombre del usuario
  cartItems: number = 0; // Número de elementos en el carrito

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private userService: UserService
  ) {
    // Verifica el estado de autenticación
    const user = localStorage.getItem('user'); // Obtén datos del usuario almacenados
    const role = localStorage.getItem('role'); // Obtén el rol almacenado

    if (user) {
      this.isLoggedIn = true;
      this.userService.getUserByID(user.replace(/"/g, '')).subscribe(user => {
        this.userName = user.username;
        this.isAdmin = user.role === 'administrador'; // Verifica si el usuario es administrador
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  login() {
    console.log('Redirigiendo a la página de login...');
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.isDropdownOpen = false;
    this.router.navigate(['/']);
  }

  profile(): void {
    const userId = localStorage.getItem('user')?.replace(/"/g, ''); // Obtén el ID del usuario eliminando comillas innecesarias
    if (userId) {
      console.log(`Redirigiendo al perfil del usuario con ID: ${userId}`);
      this.isDropdownOpen = false; // Cierra el dropdown
      this.router.navigate([`/games/user-profile/${userId}`]); // Redirige a la ruta con el ID
    } else {
      console.error('No se encontró un ID de usuario en el almacenamiento local.');
    }
  }

  cart() {
    console.log('Redirigiendo a la página del carrito...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/cart']); // Ruta correcta para carrito
  }

  wishlist() {
    console.log('Redirigiendo a la página de wishlist...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/wishlist']); // Ruta correcta para wishlist
  }

  viewUsers() {
    console.log('Redirigiendo a la página de usuarios...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/users']); // Ruta correcta para usuarios
  }

  orders() {
    console.log('Redirigiendo a la página de pedidos...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/orders']); // Ruta correcta para pedidos
  }

  viewStatistics(): void {
    console.log('Redirigiendo a la página de estadísticas...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/dashboard']); // Ruta correcta para estadísticas
  }

  addGame(): void {
    console.log('Redirigiendo a la página para añadir juegos...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/add-game']); // Ruta correcta para añadir juegos
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false; // Cierra el menú si se hace clic fuera de él
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  isLoggedIn: boolean = false; // Estado del usuario logueado
  isDropdownOpen: boolean = false;
  user !: string;

  constructor(private router: Router, private eRef: ElementRef, private userService : UserService) {
    // Simula un estado de autenticación. En un caso real, puedes usar un servicio para verificar si el usuario está logueado.
    const user = localStorage.getItem('user'); // Ejemplo: obtén datos del usuario almacenados
    if (user) {
      this.isLoggedIn = true;
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
    // Simula el cierre de sesión. En un caso real, debes eliminar los datos del usuario del localStorage.
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.isDropdownOpen = false;
    this.router.navigate(['/games']);
  }

  profile() {
    console.log('Redirigiendo a la página de perfil...');
    this.isDropdownOpen = false;
    this.router.navigate(['/profile']); // Asegúrate de que esta ruta exista
  }

  cart() {
    console.log('Redirigiendo a la página de carrito...');
    this.isDropdownOpen = false;
    this.router.navigate(['/games/cart']); // Asegúrate de que esta ruta exista
  }

  wishlist() {
    console.log('Redirigiendo a la página de wishlist...');
    this.isDropdownOpen = false;
    this.router.navigate(['/wishlist']); // Asegúrate de que esta ruta exista
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false; // Cierra el menú si se hace clic fuera de él
    }
  }

  cartItems: number = 0; // Número de elementos en el carrito

  
}

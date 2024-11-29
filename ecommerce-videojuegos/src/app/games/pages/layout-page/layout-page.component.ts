import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
  isAdmin: boolean = false; // Bandera para determinar si el usuario es administrador
  userName: string = ''; // Nombre del usuario

  constructor(private router: Router, private eRef: ElementRef, private userService: UserService) {
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

  viewStatistics(): void {
    console.log('Redirigiendo a la página de estadísticas...');
    this.isDropdownOpen = false;
    this.router.navigate(['/admin/dashboard']); // Ruta de estadísticas
  }

  addGame(): void {
    console.log('Redirigiendo a la página para añadir juegos...');
    this.isDropdownOpen = false;
    this.router.navigate(['/admin/add-game']); // Ruta para añadir juegos
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false; // Cierra el menú si se hace clic fuera de él
    }
  }

  cartItems: number = 0; // Número de elementos en el carrito
}

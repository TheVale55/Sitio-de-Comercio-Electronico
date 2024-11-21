import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  isLoggedIn: boolean = false; // Estado del usuario logueado
  userPhoto: string = ''; // Foto del usuario (puedes inicializar con un valor por defecto)

  constructor() {
    // Simula un estado de autenticación. En un caso real, puedes usar un servicio para verificar si el usuario está logueado.
    const user = localStorage.getItem('user'); // Ejemplo: obtén datos del usuario almacenados
    if (user) {
      this.isLoggedIn = true;
      this.userPhoto = JSON.parse(user).photo; // Supongamos que almacenas la foto en el localStorage
    }
  }

  login() {
    // Redirigir al usuario a la página de login
    console.log('Redirigiendo a la página de login...');
    // Aquí puedes usar el Router de Angular para redirigir, por ejemplo:
    // this.router.navigate(['/login']);
  }
}

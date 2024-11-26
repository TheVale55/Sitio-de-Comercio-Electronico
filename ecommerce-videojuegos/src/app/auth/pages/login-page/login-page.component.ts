import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent {
  constructor(private router: Router) {}
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  register(event: Event): void {
    event.preventDefault(); // Evita el comportamiento por defecto
    console.log('Redirigiendo a la página de registro...');
    this.router.navigate(['/register']); // Redirige correctamente
  }
  
}

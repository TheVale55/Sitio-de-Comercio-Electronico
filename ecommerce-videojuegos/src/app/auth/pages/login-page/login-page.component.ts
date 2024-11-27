import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: []
})
export class LoginPageComponent {


  public loginForm = new FormGroup({
    emailOrUsername: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(this.loginForm.value.emailOrUsername!, this.loginForm.value.password!)
      .subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user.user._id));
        this.router.navigate(['/games']);
      });
    
    
  }

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

import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [],
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

}

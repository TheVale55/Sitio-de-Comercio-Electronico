import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: '../../../app.component.scss',
})
export class CheckoutComponent {
 
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    cardholderName: ''
  };

  onSubmit(): void {
    if (this.isValidForm()) {
      alert('Payment submitted successfully!');
      console.log(this.paymentData);
    }
  }

  isValidForm(): boolean {
    const { cardNumber, expiryDate, securityCode, cardholderName } = this.paymentData;

    const cardNumberValid = /^[0-9]{16}$/.test(cardNumber);
    const expiryDateValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate);
    const securityCodeValid = /^[0-9]{3,4}$/.test(securityCode);

    return !!(cardholderName && cardNumberValid && expiryDateValid && securityCodeValid);
  }

}

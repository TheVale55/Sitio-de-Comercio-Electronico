import { Component } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { GameShoppingCardComponent } from "../../components/game-shopping-card/game-shopping-card.component";
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../../auth/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [GameShoppingCardComponent, CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: '../../../app.component.scss',
})
export class ShoppingCartComponent {
  public userId !: User;
  public shoppingCart: string[] = ["673e74d5a2be1410b7e213d6","673e74d5a2be1410b7e21410"];
  public totalPrices: number[] = [0,0];
  public total = 0;
  public subtotal = 0;
  public shipping = 5;
  public tax = 0;
  public final_total = 0;
  public envio_estandar = []

  constructor(
    private route: Router,
    private userService: UserService,
  ){}

  ngOnInit(): void {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      //TODO FIX USER SERVICE CART NOT WORKING 
      this.userService.cart(userID).subscribe(
        (cart) => {this.shoppingCart = cart; console.log ("user id is ", userID);console.log ("shopping cart is " + this.shoppingCart)}
      )
    }

  }

  onTotalPriceChange(newTotal: number, gamePosition: number) {
    this.totalPrices[gamePosition] = newTotal;
    this.updateTotal();
    console.log(this.totalPrices)
  }

  updateShipping(event: any) {
    this.shipping = parseInt(event.target.value);
    this.updateTotal();
  }

  updateTotal() {
    this.total = 0;
    for (let index in this.totalPrices) {
      this.total += this.totalPrices[index];
    }
    this.subtotal = this.total;
    this.total = this.total + this.shipping;
    this.total = this.roundToDecimal(this.total, 2);
    this.tax = this.roundToDecimal(this.total*0.15, 2);
    this.final_total = this.roundToDecimal(this.total+this.tax, 2);
    console.log(this.total, this.subtotal, this.shipping);
  }

  roundToDecimal(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }
  
  isCartVisible: boolean = true;

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

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

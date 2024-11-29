import { Component } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { GameShoppingCardComponent } from "../../components/game-shopping-card/game-shopping-card.component";
import { CommonModule } from '@angular/common';
import { Payment, User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../../auth/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinciasService } from '../../../auth/services/provincias.service';
import { PaymentService } from '../../../auth/services/payment.service';
import { forkJoin } from 'rxjs';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [GameShoppingCardComponent, CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: '../../../app.component.scss',
})
export class ShoppingCartComponent {
  public userId !: string;
  public shoppingCart: string[] = [];
  public totalPrices: number[] = [0,0];
  public total = 0;
  public subtotal = 0;
  public shipping = 10;
  public tax = 0;
  public final_total = 0;
  public envio_estandar = []

  isCartVisible: boolean = true;
  isSummaryVisible: boolean = false;
  isShippingVisible: boolean = false;
  isPaymentVisible: boolean = false;


  constructor(
    private route: Router,
    private userService: UserService,
    public provinciaService: ProvinciasService,
    public paymentService: PaymentService,
    public gameService : GamesService,
  ){}

  ngOnInit(): void {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userId = userID.toString().replace(/"/g, '');
      this.userService.cart(this.userId).subscribe(
        (cart) => {
          this.shoppingCart = cart; 
          console.log(cart)
          console.log(this.shoppingCart)
        }
      )
    }

  }

  createPayment(){
    const User_ID: string = this.userId;
    const Games: string[] = this.shoppingCart;
    const Purchase_Address: string = this.provinciaService.getFullAddress();
    const Order_Status: string = "en preparación";
    const Total_Amount: number = this.final_total;
    const createdAt: Date = new Date();
    console.log(User_ID, Games, Purchase_Address, Order_Status, Total_Amount, createdAt);

    const payment: Payment = {
      id: User_ID+createdAt,
      User_ID,
      Games,
      Purchase_Address,
      Order_Status,
      Total_Amount,
      createdAt
  };

  this.paymentService.addPayment(payment).subscribe(
    (response) => {
        console.log('Payment successfully created:', response);
        this.route.navigate(['/games']);
        
        const deleteRequests = this.shoppingCart.map((gameID) =>
            this.userService.removeFromCart(this.userId, gameID)
        );
        // Execute all delete requests in parallel
        forkJoin(deleteRequests).subscribe({
            next: (responses) => {
                console.log('All games removed from cart:', responses);
                this.shoppingCart = []; // Clear the cart array locally
            },
            error: (err) => {
                console.error('Error removing items from cart:', err);
            }
        });
        alert("Succesfully purchased order")
    },
    (err) => {
        alert("Error in the purchase process")
    }
  );
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
    this.tax = this.roundToDecimal(this.total*0.13, 2);
    this.final_total = this.roundToDecimal(this.total+this.tax, 2);
    console.log(this.total, this.subtotal, this.shipping);
  }

  roundToDecimal(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  togglePayment() {
    this.isPaymentVisible = !this.isPaymentVisible;
  }

  toggleShipping() {
    this.isShippingVisible = !this.isShippingVisible;
  }

  toggleSummary() {
    this.isSummaryVisible = !this.isSummaryVisible;
  }

  backToCart(){
    this.isCartVisible = true;
    this.isSummaryVisible = false;
    this.isShippingVisible = false;
    this.isPaymentVisible = false;
  }

  paymentData = {
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    cardholderName: ''
  };

  onSubmit(): void {  }

  isValidForm(): boolean {
    const { cardNumber, expiryDate, securityCode, cardholderName } = this.paymentData;

    const cardNumberValid = /^[0-9]{16}$/.test(cardNumber);
    const expiryDateValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate);
    const securityCodeValid = /^[0-9]{3,4}$/.test(securityCode);

    return !!(cardholderName && cardNumberValid && expiryDateValid && securityCodeValid);
  }

}

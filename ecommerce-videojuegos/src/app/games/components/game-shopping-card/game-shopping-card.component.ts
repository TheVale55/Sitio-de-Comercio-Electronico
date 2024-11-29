import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-shopping-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-shopping-card.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GameShoppingCardComponent {
  @Input()
  gameId : string = "";
  @Input()
  quantity! : number;

  game !: Game;
  price : number = 0;
  @Output() total_price = new EventEmitter<number>();

  constructor(private gameService: GamesService, private userService : UserService, private route: Router){}

  ngOnInit(): void {
    if (!this.gameId) {
      throw Error('Game property is required');
    }
    else{
      console.log(this.gameId)
      this.gameService.getGameById(this.gameId).subscribe(
        (game) => {this.game = game; this.updateTotal(); }
      )
    }
  }

  updateTotal(){
    this.price = this.quantity * this.game.Game_Price;
    this.price = this.roundToDecimal(this.price, 2);
    this.total_price.emit(this.price);
  }

  roundToDecimal(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  addToWishlist() {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userService.addToWishlist(userID.toString().replace(/"/g, ''), this.game._id).subscribe(
        (response) => {
          console.log('Item removed from cart:', response);
      },
      (error) => {
          alert("Could not add item to wishlist");
      }
      )
    }
  }

  removeFromShoppingCart(){
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userService.removeFromCart(userID.toString().replace(/"/g, ''), this.game._id).subscribe( 
        (response) => {
          console.log('Item removed from cart:', response);
          window.location.reload();
      },
      (error) => {
          console.error('Error removing item from cart:', error);
      }
      )
    }
  }

  increaseQuantity(){
    this.quantity++;
    //TODO añadir servicio
    this.userService.updateCart(localStorage.getItem('user')?.toString().replace(/"/g, '')!, this.game._id, this.quantity).subscribe(
      (response) => {
        console.log('Item removed from cart:', response);
      },
    )
    this.updateTotal()
  }

  decreaseQuantity(){
    if(this.quantity>1){
      this.quantity--;
      //TODO añadir servicio
      this.userService.updateCart(localStorage.getItem('user')?.toString().replace(/"/g, '')!, this.game._id, this.quantity).subscribe(
        (response) => {
          console.log('Item removed from cart:', response);
        },
        (error) => {
            console.error('Error removing item from cart:', error);
        }
      )
    }
    this.updateTotal()
  }

}

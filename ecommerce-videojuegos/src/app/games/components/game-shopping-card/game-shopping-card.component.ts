import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../../auth/services/user.service';

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

  game !: Game;
  quantity:number=1;
  price : number = 0;
  @Output() total_price = new EventEmitter<number>();

  constructor(private gameService: GamesService, private userService : UserService){}

  ngOnInit(): void {
    if (!this.gameId) {
      throw Error('Game property is required');
    }
    else{
      this.gameService.getGameById(this.gameId).subscribe(
        (game) => {this.game = game; this.updateTotal()}
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

  addToWishlist(){
    const userId = "";
    this.userService.addToCart(userId, this.gameId)
  }

  removeFromShoppingCart(){

  }

  increaseQuantity(){
    this.quantity++;
    this.updateTotal()
  }

  decreaseQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
    this.updateTotal()
  }

}

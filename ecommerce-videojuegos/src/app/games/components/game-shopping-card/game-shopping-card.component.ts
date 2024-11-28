import { Component, Input, Output } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../services/games.service';

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
  
  @Output()
  total_price:number = 0;

  constructor(private gameService: GamesService){}

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
    this.total_price = this.quantity * this.game.Game_Price
  }

  addToWishlist(){

  }

  removeFromShoppingCart(){

  }

  increaseQuantity(){
    this.quantity++;
    const inputField = document.getElementById("counter-input") as HTMLInputElement;
    if (inputField) {
      inputField.value = this.quantity.toString();
    }
    this.updateTotal()
  }

  decreaseQuantity(){
    if(this.quantity>1){
      this.quantity--;
      const inputField = document.getElementById("counter-input") as HTMLInputElement;
      if (inputField) {
        inputField.value = this.quantity.toString();
      }
    }
    this.updateTotal()
  }

}

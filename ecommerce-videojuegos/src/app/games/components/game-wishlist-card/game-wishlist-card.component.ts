import { Component, Input } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { GamesService } from '../../services/games.service';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-wishlist-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-wishlist-card.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GameWishlistCardComponent {
  @Input()
  gameId : string = "";
  userId!: string;
  game !: Game;

  constructor(private gameService: GamesService, private userService: UserService){}

  ngOnInit(): void {
    if (!this.gameId) {
      throw Error('Game property is required');
    }
    else{
      const userID = localStorage.getItem('user');
      if(userID)
        this.userId = userID.toString().replace(/"/g, '');
      this.gameService.getGameById(this.gameId).subscribe(
        (game) => {this.game = game; }
      )
    }
  }

  addToCart(){
    this.userService.addToCart(this.userId, this.gameId).subscribe(
      (response) => {
        console.log('Item added to cart', response);
      },
      (error) => {
          alert("Could not add item to cart");
      }
    )
  }

  removeFromWishlist(){
    this.userService.removeFromWishlist(this.userId, this.gameId).subscribe(
      (response) => {
        console.log('Item removed from wishlist', response);
        window.location.reload();
      },
      (error) => {
          alert("Could not remove item from wishlist");
      }
    )
  }
}

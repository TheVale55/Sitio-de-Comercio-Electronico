import { UserService } from './../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageCarouselComponent } from "../../../shared/components/image-carousel/image-carousel.component";
import { Game } from '../../interfaces/games.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { HttpClient } from '@angular/common/http';
import { ReviewsComponent } from "../../components/reviews/reviews.component";
import { GameCardComponent } from "../../components/game-card/game-card.component";
import  { CostarricanPricePipe } from '../../pipes/costarrican-price.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule, 
    ImageCarouselComponent, 
    ReviewsComponent, 
    GameCardComponent, 
    CostarricanPricePipe,
    FormsModule
  ],
  templateUrl: './game-page.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GamePageComponent {
  public game!: Game;
  public descript : string = "";
  public rating = 5;
  public isUserRegistered = false;

  public userReviews =  [
    ["Mario Meyers", "Loved the game! The graphics and gameplay are amazing."],
    ["Martha Doe", "It's fun, but the story is a bit lacking."],
    ["John Smith", "Good gameplay, but the controls could be better."],
    ["Samantha Lee", "This game is incredible! The best I've played in years."],
    ["Michael Johnson", "Not what I expected. The AI is terrible."],
    ["Emily Davis", "Great fun, but the online servers are a bit unstable."],
    ["James Wilson", "Exceeded my expectations, truly epic experience."],
    ["Sarah Brown", "The game is good, but it gets repetitive after a while."],
    ["David Moore", "Solid game. The mechanics are great, but the pacing feels off."],
    ["Laura Taylor", "Absolutely loved it! The world-building is phenomenal."],
    ["Chris Anderson", "Great game, though I wish the combat was more fluid."],
    ["Anna White", "It's okay, but felt more like a rehash of previous games."],
  ];

  public  randomRatings = [5, 3, 4, 5, 1, 4, 3, 4, 5, 2, 3, 4];
  public similarGames: Game[] = [] 

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private http: HttpClient,
    private gameService: GamesService,
    private userService: UserService,
  ){}

  ngOnInit(): void {    
    this.activeRoute.params.subscribe(({id})=>{
      this.gameService.getGameById(id)
      .subscribe(game=>{
        if(!game){
          this.route.navigate(['/'])
          return;
        }
        this.game = game;
        this.descript = this.game.Game_Description.split('Español')[0].trim();
        this.gameService.getGamesByCategory('Action').subscribe((games) => {
          this.similarGames = games;
        });
        //TODO get comentarios y reviews

      })
    })

    const userId = localStorage.getItem('user')?.replace(/"/g, '');
    if(userId){
      this.isUserRegistered = true;
    }
    else{
      this.isUserRegistered = false;
    }

  }

  onSubmit() {
    const data = {
      comment: this.user_comment,
      rating: this.user_rating,
    };
    //TODO funcion anadir comentario de un juego
    //gameService.addGameReview(userId, comment, rating).suscribe()

    console.log('Submitted data:', data);
    alert(`Comment: ${this.user_comment}\nRating: ${this.user_rating}`);
  }

  addToCart(game: Game) {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userService.addToCart(userID.toString().replace(/"/g, ''), game._id).subscribe({
        next: () => {
          alert('Game added to cart successfully!');
        },
        error: (err) => {
          alert( 'Failed to add game to cart');
        },
      });

    }
  }
  addToWishlist(game: Game) {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userService.addToWishlist(userID.toString().replace(/"/g, ''), game._id).subscribe({
          next: () => {
            alert('Game added to wishlist successfully!');
          },
          error: (err) => {
            alert( 'Failed to add game to wishilist');
          },
        
    });
    }
  }

  user_comment: string = '';
  user_rating: number = 0;
  user_hover: number = 0;
  user_stars = [1, 2, 3, 4, 5];

  selectRating(star: number) {
    this.user_rating = star;
  }

  hoverRating(star: number) {
    this.user_hover = star;
  }

}



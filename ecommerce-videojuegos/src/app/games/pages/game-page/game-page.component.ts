import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageCarouselComponent } from "../../../shared/components/image-carousel/image-carousel.component";
import { Game } from '../../interfaces/games.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { HttpClient } from '@angular/common/http';
import { ReviewsComponent } from "../../components/reviews/reviews.component";
import { GameCardComponent } from "../../components/game-card/game-card.component";


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, ImageCarouselComponent, ReviewsComponent, GameCardComponent],
  templateUrl: './game-page.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GamePageComponent {
  public game!: Game;
  public descript : string = "";
  public rating = 5;

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
    private gameService: GamesService
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
      })
    })
  }



}



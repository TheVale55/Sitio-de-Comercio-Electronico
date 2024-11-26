import { Game } from './../../../games/interfaces/games.interface';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameCardComponent } from '../../../games/components/game-card/game-card.component';
import { GamesService } from '../../../games/services/games.service';
import { GameCarouselComponent } from '../../../games/components/game-carousel/game-carousel.component';
@Component({
  selector: 'app-land-page',
  standalone: true,
  imports: [CommonModule, RouterModule, GameCardComponent, GameCarouselComponent],
  templateUrl: './land-page.component.html',
  styles: ``
})
export class LandPageComponent {
  public playGames: Game[] = []
  public xboxGames: Game[] = []
  public pcGames: Game[] = []
  public nintendoGames: Game[] = []
  public saleGames: Game[] = []

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gameService.getGames("", "", "playstation").subscribe(games => {
      this.playGames = games
    })
    this.gameService.getGames("", "", "xbox").subscribe(games => {
      this.xboxGames = games
    })
    this.gameService.getGames("", "", "pc").subscribe(games => {
      this.pcGames = games
    })
    this.gameService.getGames("", "", "nintendo").subscribe(games => {
      this.nintendoGames = games
    })
  }

}

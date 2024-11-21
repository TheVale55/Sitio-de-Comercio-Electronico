import { GamesService } from './../../services/games.service';
import { Component } from '@angular/core';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { Game } from '../../interfaces/games.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameCardComponent, CommonModule],
  templateUrl: './game-list.component.html',
  styles: ``
})
export class GameListComponent {
  public games: Game[] = []

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(
      games => this.games = games
    );
  }
}

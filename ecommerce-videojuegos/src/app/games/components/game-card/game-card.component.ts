import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../interfaces/games.interface';
import { Router, RouterModule } from '@angular/router';
import { CostarricanPricePipe } from '../../pipes/costarrican-price.pipe';
import { GamesService } from '../../services/games.service';
@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CostarricanPricePipe],
  templateUrl: './game-card.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GameCardComponent {
  @Input()
  public game!: Game;

  constructor(private router: Router, private gamesService: GamesService) {}


  ngOnInit(): void {
    if (!this.game) {
      throw Error('Game property is required');
    }
  }

  juegoClickeado(id: string): void {
    this.gamesService.addViewCount(id).subscribe();
    this.router.navigate(['/games', id]);
    window.scrollTo(0, 0);
  }

}

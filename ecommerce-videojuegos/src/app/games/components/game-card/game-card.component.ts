import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../interfaces/games.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styles: ``
})
export class GameCardComponent {
  @Input()
  public game!: Game;

  constructor(private router: Router) {}


  ngOnInit(): void {
    if (!this.game) {
      throw Error('Game property is required');
    }
  }

  juegoClickeado(id: string): void {
    console.log(id);
    this.router.navigate(['/games', id]);
    window.scrollTo(0, 0);
  }

}

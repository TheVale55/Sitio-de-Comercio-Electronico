import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-carousel',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
})
export class GameCarouselComponent {
  @Input()
  public games: Game[] = [];

  currentIndex = 0;

  get maxIndex(): number {
    return Math.ceil(this.games.length / 4) - 1; // Calcula cuántas páginas hay
  }

  nextSlide(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }else{
      this.currentIndex = 0
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }else{
      this.currentIndex = this.maxIndex
    }
  }
}

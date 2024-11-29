import { Component, Input, OnInit } from '@angular/core';
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
  styles: '',
})
export class GameCardComponent implements OnInit {
  @Input()
  public game!: Game;

  public isAdmin: boolean = false; // Bandera para determinar si el usuario es administrador

  constructor(private router: Router, private gamesService: GamesService) {}

  ngOnInit(): void {
    if (!this.game) {
      throw Error('Game property is required');
    }
    
    // Verifica si el usuario es administrador
    if (localStorage.getItem('role') === '"administrador"') {
      this.isAdmin = true;
    }
  }
  
  juegoClickeado(id: string): void {
    this.gamesService.addViewCount(id).subscribe();
    this.router.navigate(['/games', id]);
    window.scrollTo(0, 0);
  }

  editarJuego(id: string): void {
    console.log(`Navegando a la página de edición del juego con ID: ${id}`);
    this.router.navigate(['/games/edit-game', id]);
    window.scrollTo(0, 0); // Opcional: desplaza la ventana hacia arriba
  }
}

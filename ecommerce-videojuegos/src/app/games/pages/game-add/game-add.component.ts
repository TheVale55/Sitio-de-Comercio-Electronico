import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Game } from '../../interfaces/games.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styles: '',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class GameAddComponent {
  public game: Game = {
    _id: '',
    Game_Name: '',
    Game_Description: '',
    Game_Price: 0,
    Game_Category: [],
    Game_Platform: [],
    Game_ESRB_Rating: '',
    Brand: '',
    Discount: 0,
    Game_Short_Screenshots: [],
    Game_Background_Image: '',
    comments: [],
    reviews: 0,
  };

  activeTab: string = 'main';

  // Opciones dinámicas para dropdowns
  public categories: string[] = ['Action', 'Adventure', 'RPG', 'Shooter'];
  public platforms: string[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
  public esrbRatings: string[] = ['E', 'E10+', 'T', 'M', 'AO'];
  public brands: string[] = ['Ubisoft', 'EA', 'Rockstar', 'Activision'];

  constructor(private router: Router, private gameService: GamesService) {}

  // Método para cambiar de pestaña
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addGame(): void {
    console.log('Creando juego...', this.game);
    this.gameService.addGame(this.game).subscribe(
      (response) => {
        console.log('Juego creado con éxito:', response);
        this.router.navigate(['/games']); // Redirigir tras añadir el juego
      },
      (error) => {
        console.error('Error al crear el juego:', error);
      }
    );
  }

  addItem(listName: keyof Game): void {
    if (Array.isArray(this.game[listName])) {
      (this.game[listName] as string[]).push(''); // Asegura que es un array
    } else {
      console.error(`La propiedad ${listName} no es un array`);
    }
  }
  
  removeItem(listName: keyof Game, index: number): void {
    if (Array.isArray(this.game[listName])) {
      (this.game[listName] as string[]).splice(index, 1); // Asegura que es un array
    } else {
      console.error(`La propiedad ${listName} no es un array`);
    }
  }

  goBack(): void {
    this.router.navigate(['/games']);
  }
  
}

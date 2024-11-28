import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { Game } from '../../interfaces/games.interface';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styles: '',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class GameEditComponent implements OnInit {
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
  };

  // Opciones dinámicas para dropdowns
  public categories: string[] = [];
  public platforms: string[] = [];
  public esrbRatings: string[] = [];
  public brands: string[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private gameService: GamesService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del juego desde la ruta
    this.activeRoute.params.subscribe(({ id }) => {
      this.gameService.getGameById(id).subscribe((game) => {
        if (!game) {
          this.router.navigate(['/admin/manage-games']);
          return;
        }
        this.game = game; // Cargar los datos del juego en el formulario
      });
    });
  
    // Cargar las opciones dinámicas para los dropdowns
    this.loadDropdownData();
  }
  

  // Método para cargar datos dinámicos
  loadDropdownData(): void {
    this.gameService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.gameService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    });
    this.gameService.getEsrbRatings().subscribe((ratings) => {
      this.esrbRatings = ratings;
    });
    this.gameService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  guardarCambios(): void {
    this.gameService.updateGame(this.game._id, this.game).subscribe(
      (response) => {
        console.log('Juego actualizado con éxito:', response);
        this.router.navigate(['/admin/manage-games']); // Redirigir tras guardar cambios
      },
      (error) => {
        console.error('Error al actualizar el juego:', error);
      }
    );
  }

  borrarJuego(): void {
    this.gameService.deleteGame(this.game._id).subscribe(
      (response) => {
        console.log('Juego eliminado con éxito:', response);
        this.router.navigate(['/admin/manage-games']); // Redirigir tras eliminar
      },
      (error) => {
        console.error('Error al eliminar el juego:', error);
      }
    );
  }
}

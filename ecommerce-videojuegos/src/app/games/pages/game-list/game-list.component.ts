import { GamesService } from './../../services/games.service';
import { Component } from '@angular/core';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { Game } from '../../interfaces/games.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameCardComponent, CommonModule, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrl: '../../../app.component.scss',
})
export class GameListComponent {
  public games: Game[] = [];
  //Variables used for the filtering dropdown
  public game_categories : string [] = [];
  public game_brands: string[] = [];
  public game_ratings: string[] = [];
  public game_platforms: string[] = [];
  public min_price: number = 0;
  public max_price: number = 0;
  dropdownOpen = false;
  //Variables used for the search bar
  public all_games: Game[] = [];
  public searchQuery: string = '';
  public filteredGames: Game[] = [];
  private searchSubject = new Subject<string>();

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.gameService.getGames("","","","","","").subscribe(
      games => {this.games = games; this.all_games=games}
    );
    //Search bar observer
    this.searchSubject
    .pipe(
    debounceTime(150), // Wait 150ms after the last keystroke
    distinctUntilChanged(), 
    switchMap((query) => {
      const trimmedQuery = query.trim(); 
      if (!trimmedQuery) {
        this.filteredGames = []; 
        return []; 
      }
      this.filterGames(trimmedQuery);
      if (this.games.length === 1) {
        this.filteredGames = [];
      } else {
        this.filteredGames = this.games.slice(0, 5); 
      }
      return [];
    })
  )
  .subscribe(); 
    //Filtering dropdown values
    // TODO change for info loaded from Service  
    this.game_categories = ["Action", "RPG", "Shooter", "Puzzle"];
    this.game_brands = ["Valve","Capcom", "Electronic Arts", "Ubisoft Entertainment", "Square Enix", "Rockstar Games"];
    this.game_platforms = ["Android","Linux", "macOS", "Xbox 360", "PC", "PlayStation 4", "Nintendo Switch", "Xbox One"];
    this.game_ratings = ["Mature", "Everyone 10+", "Everyone"];
    // TODO add category filtering
  }

  //Advanced filtering by
  filters = {
    esbrRating:'', 
    minPrice: 0,
    maxPrice: 0,
    category: '',
    brand: '',
    platform: '',
    popularity: 0,
  };
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  applyFilters() {
    const minPrice = this.filters.minPrice > 0 ? this.filters.minPrice.toString() : "";
    const maxPrice = this.filters.maxPrice > 0 ? this.filters.maxPrice.toString() : "";
    //console.log(this.filters.esbrRating, this.filters.category, this.filters.platform, minPrice, maxPrice, this.filters.brand)
    this.gameService.getGames(this.filters.esbrRating, this.filters.category, this.filters.platform, minPrice, maxPrice, this.filters.brand)
    .subscribe(
      games => {this.games = games; console.log(games)}
    );
    this.dropdownOpen = false; 
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  selectGame(gameName: string) {
    this.searchQuery = gameName; 
    this.searchSubject.next(this.searchQuery);
    this.filteredGames = [];    
  }

  public filterGames(query: string){
    this.games = this.all_games.filter(game => 
      game.Game_Name.toLowerCase().includes(query.toLowerCase()) 
    );
  }
  

}

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
  public min_price: number = 0;
  public max_price: number = 0;
  dropdownOpen = false;
  //Variables used for the search bar
  public searchQuery: string = '';
  public filteredGames: Game[] = [];
  private searchSubject = new Subject<string>();

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    //Initial game loading
    this.gameService.getGames().subscribe(
      games => {this.games = games;}
    );
    //Search bar observer
    this.searchSubject
      .pipe(
        debounceTime(150), // Wait 300ms after the last keystroke
        distinctUntilChanged(), // Only trigger if the query changes
        switchMap((query) => this.gameService.getGamesByName(query))
      )
      .subscribe(
        (games) => {
          this.games = games;
          if (!this.searchQuery.trim()) {
            this.filteredGames = []; // Clear filteredGames if the query is empty
          }
          else if (games.length===1){
            this.filteredGames = []; 
          }
          else {
            this.filteredGames = games.slice(0, 5); // Take the first 5 results
          }
        },
        (error) => {
          console.error('Error fetching games:', error);
          this.filteredGames = [];
        }
      );
    //Filtering dropdown values
    // TODO change for info loaded from Service  
    this.game_categories = ["Action", "RPG", "Shooter", "Puzzle"];
    this.game_brands = ["Valve","Capcom", "Electronic Arts", "Ubisoft Entertainment", "Square Enix", "Rockstar Games"];
    // TODO add category filtering
  }

  //Advanced filtering by
  filters = {
    minPrice: 0,
    maxPrice: 0,
    category: '',
    brand: '',
    popularity: 0,
  };
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  applyFilters() {
     // TODO add category filtering
    this.gameService.getFilteredGames(this.filters.minPrice, this.filters.maxPrice, this.filters.category, this.filters.brand).subscribe(
      games => {this.games = games;}
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
  

}

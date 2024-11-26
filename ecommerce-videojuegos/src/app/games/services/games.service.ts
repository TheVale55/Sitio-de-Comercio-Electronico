import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Game } from '../interfaces/games.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGames(esbrRating: string, category: string, platform: string, precioMin: string, precioMax: string, brand: string): Observable<Game[]>{
    console.log(esbrRating, category, platform, brand, precioMax, precioMin)
    return this.http.get<Game[]>(`${this.baseUrl}/api/games?esbrRating=${esbrRating}&category=${category}&platform=${platform}&precioMin=${precioMin}&precioMax=${precioMax}&brand=${brand}`);
  }

  getSaleGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games/sale`);
  }

  getGameById(id: string):Observable<Game>{
    return this.http.get<Game>(`${this.baseUrl}/api/games/${id}`);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`).pipe(
      map(games => 
        games
          .filter(game => game.Game_Category.includes(category))  // Filter by category
          .sort(() => Math.random() - 0.5)  // Shuffle the array randomly
          .slice(0, 4)  // Take the first 4 games from the shuffled list
      )
    );
  }
  
}

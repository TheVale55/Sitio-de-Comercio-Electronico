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

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`);
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

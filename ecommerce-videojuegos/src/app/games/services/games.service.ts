import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Game } from '../interfaces/games.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Obtener lista de categorías
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  // Obtener lista de plataformas
  getPlatforms(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/platforms`);
  }

  // Obtener lista de ESRB Ratings
  getEsrbRatings(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/esrb-ratings`);
  }

  // Obtener lista de marcas
  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/brands`);
  }

  getGames(
    esbrRating: string,
    category: string,
    platform: string,
    precioMin: string,
    precioMax: string,
    brand: string,
    views: boolean
  ): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${this.baseUrl}/api/games?esrbRating=${esbrRating}&category=${category}&platform=${platform}&precioMin=${precioMin}&precioMax=${precioMax}&brand=${brand}&views=${views}`
    );
  }

  getSaleGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games/sale`);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/api/games/${id}`);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`).pipe(
      map((games) =>
        games
          .filter((game) => game.Game_Category.includes(category)) // Filtrar por categoría
          .sort(() => Math.random() - 0.5) // Mezclar aleatoriamente
          .slice(0, 4) // Tomar los primeros 4 juegos de la lista
      )
    );
  }

  addViewCount(id: string): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/api/games/${id}/views`, {});
  }

  updateGame(id: string, game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/api/games/${id}`, game);
  }

  deleteGame(id: string): Observable<Game> {
    return this.http.delete<Game>(`${this.baseUrl}/api/games/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/api/games`, game);
  }

  setSales(): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/games/sale`, {});
  }
}

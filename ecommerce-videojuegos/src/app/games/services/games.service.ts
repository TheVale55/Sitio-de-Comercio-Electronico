import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Game } from '../interfaces/games.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.baseUrl}/api/games`);
  }

  getGameById(id: string){
    return this.http.get(`${this.baseUrl}/api/games/${id}`);
  }
}

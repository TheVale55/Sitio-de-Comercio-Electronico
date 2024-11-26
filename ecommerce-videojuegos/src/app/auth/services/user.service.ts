import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users`)
  }
  addToCart(userID: string, gameID: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/users/${userID}/cart/${gameID}`, {})
  }
  removeFromCart(userID: string, gameID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/users/${userID}/cart/${gameID}`)
  }
  addToWishlist(userID: string, gameID: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/users/${userID}/wishlist/${gameID}`, {})
  }
  removeFromWishlist(userID: string, gameID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/users/${userID}/wishlist/${gameID}`)
  }
}

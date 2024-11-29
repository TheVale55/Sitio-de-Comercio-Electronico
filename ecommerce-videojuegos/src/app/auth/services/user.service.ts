import { Payment } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of} from 'rxjs';
import { GameShoppingCardComponent } from '../../games/components/game-shopping-card/game-shopping-card.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/users`)
  }
  getUserByID(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/users/user?userID=${id}`)
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
  register(username: string, password: string, email: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/users/register?username=${username}&password=${password}&email=${email}`, {})
  }
  login(credential: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/users/login?credential=${credential}&password=${password}`, {})
  }
  cart(userID: string): Observable<any[]> {
    return this.http.get<{ shoppingCart: any[] }>(`${this.baseUrl}/api/users/${userID}/cart`).pipe(
        map(response => response.shoppingCart)
    );
}
  history(userID: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/users/${userID}/history`)
  }
  wishlist(userID: string): Observable<any> {
    return this.http.get<{ wishlist: string[] }>(`${this.baseUrl}/api/users/${userID}/wishlist`).pipe(
      map(response => response.wishlist)
  );
  }
  updateUser(userID: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/users/${userID}`, user)
  }
  deleteUser(userID: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/users/${userID}`)
  }
  
}

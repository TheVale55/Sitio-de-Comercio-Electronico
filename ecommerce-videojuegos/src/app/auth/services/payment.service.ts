import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/api/payments`);
  }

  getPaymentByID(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/api/payments/${id}`);
  }

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/api/payments`, payment);
  }

  updatePayment(id: string, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/api/payments/${id}`, payment);
  }


}

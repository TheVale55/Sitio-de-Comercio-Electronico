import { Payment } from './../../../auth/interfaces/user.interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../auth/services/payment.service';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styles: '',
  standalone: true,
  imports: [CommonModule],
})

export class OrdersComponent {

  constructor(private paymentService: PaymentService, private userService: UserService) { }

  payments: Payment[] = [];
  user!: User;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.paymentService.getPayments().subscribe(
      (payments) => {
        this.payments = payments;
      }
    );
  }

  // orders: Order[] = [
  //   { id: 1, customerName: 'Juan Pérez', product: 'PlayStation 5', date: '2024-11-01', status: 'En preparación' },
  //   { id: 2, customerName: 'María López', product: 'Xbox Series X', date: '2024-11-02', status: 'Enviado' },
  //   { id: 3, customerName: 'Carlos García', product: 'Nintendo Switch', date: '2024-11-03', status: 'Entregado' },
  //   { id: 4, customerName: 'Ana Fernández', product: 'PlayStation 5', date: '2024-11-04', status: 'En preparación' },
  //   { id: 5, customerName: 'Luis Martínez', product: 'PC Gamer MSI', date: '2024-11-05', status: 'Enviado' },
  //   { id: 6, customerName: 'Marta Gómez', product: 'Steam Deck', date: '2024-11-06', status: 'Entregado' },
  //   { id: 7, customerName: 'Jorge Rodríguez', product: 'PlayStation VR 2', date: '2024-11-07', status: 'En preparación' },
  //   { id: 8, customerName: 'Lucía Sánchez', product: 'Xbox Elite Controller', date: '2024-11-08', status: 'Enviado' },
  //   { id: 9, customerName: 'Pedro Ruiz', product: 'Meta Quest 3', date: '2024-11-09', status: 'Entregado' },
  //   { id: 10, customerName: 'Sofía Hernández', product: 'Logitech G Pro Mouse', date: '2024-11-10', status: 'En preparación' },
  // ];

  statuses: string[] = ['En preparación', 'Enviado', 'Entregado'];

  updateStatus(orderId: string, newStatus: string, paymentChange: Payment) {
    paymentChange.Order_Status = newStatus
    this.paymentService.updatePayment(orderId, paymentChange).subscribe(
      (msg) =>{
        console.log(msg)
      }
    )
  }
}

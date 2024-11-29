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

  statuses: string[] = ['En preparación', 'Enviado', 'Entregado'];

  updateStatus(orderId: string, newStatus: string, paymentChange: Payment) {
    paymentChange.Order_Status = newStatus
    this.paymentService.updatePayment(orderId, paymentChange).subscribe(
      (msg) =>{
        console.log(msg)
      }
    )
    window.location.reload();
  }
}

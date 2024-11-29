import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  customerName: string;
  product: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styles: '',
  standalone: true,
  imports: [CommonModule],
})

export class OrdersComponent {
  orders: Order[] = [
    { id: 1, customerName: 'Juan Pérez', product: 'PlayStation 5', date: '2024-11-01', status: 'En preparación' },
    { id: 2, customerName: 'María López', product: 'Xbox Series X', date: '2024-11-02', status: 'Enviado' },
    { id: 3, customerName: 'Carlos García', product: 'Nintendo Switch', date: '2024-11-03', status: 'Entregado' },
    { id: 4, customerName: 'Ana Fernández', product: 'PlayStation 5', date: '2024-11-04', status: 'En preparación' },
    { id: 5, customerName: 'Luis Martínez', product: 'PC Gamer MSI', date: '2024-11-05', status: 'Enviado' },
    { id: 6, customerName: 'Marta Gómez', product: 'Steam Deck', date: '2024-11-06', status: 'Entregado' },
    { id: 7, customerName: 'Jorge Rodríguez', product: 'PlayStation VR 2', date: '2024-11-07', status: 'En preparación' },
    { id: 8, customerName: 'Lucía Sánchez', product: 'Xbox Elite Controller', date: '2024-11-08', status: 'Enviado' },
    { id: 9, customerName: 'Pedro Ruiz', product: 'Meta Quest 3', date: '2024-11-09', status: 'Entregado' },
    { id: 10, customerName: 'Sofía Hernández', product: 'Logitech G Pro Mouse', date: '2024-11-10', status: 'En preparación' },
  ];

  statuses: string[] = ['En preparación', 'Enviado', 'Entregado'];

  updateStatus(orderId: number, newStatus: string) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      console.log(`El estado del pedido con ID ${orderId} se actualizó a: ${newStatus}`);
    }
  }

  updateOrder(orderId: number = 0) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      console.log(`El pedido con ID ${orderId} ha sido actualizado`);
    }
  }

  removeOrder(orderId: number) {
    const index = this.orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      this.orders.splice(index, 1);
      console.log(`El pedido con ID ${orderId} ha sido eliminado`);
    }
  }
}
